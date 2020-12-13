import { useCallback, useEffect, useRef, useState } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { useOutsideClick } from '../../hooks/useOutsideClick.hook';
import {
  EAction,
  TDate,
  TOnBlurTitle,
  TOnChange,
  TOnChangeCompleteCustom,
  TOnChangeDate,
  TOnChangeTitle,
  TOnKeyDownTitle,
  TReminderRef,
  TTitleRef,
} from './Reminder.types';

export const DEFAULT_REMINDER = {
  id: '',
  title: '',
  date: null,
  complete: false,
};

type TUseReminderExpected = {
  title: string;
  date: TDate;
  expanded: boolean;
  reminderRef: TReminderRef;
  titleRef: TTitleRef;
  onKeyDownTitle: TOnKeyDownTitle;
  onChangeTitle: TOnChangeTitle;
  onFocusTitle: () => void;
  onBlurTitle: TOnBlurTitle;
  onDelete: () => void;
  onChangeDate: TOnChangeDate;
  onChangeCompleteCustom: TOnChangeCompleteCustom;
};

type TUseReminder = (
  reminder: TReminder,
  onChange: TOnChange,
) => TUseReminderExpected;

export const useReminder: TUseReminder = (reminder, onChange) => {
  const {
    id: reminderId,
    title: reminderTitle,
    date: reminderDate,
    complete: reminderComplete,
  } = reminder;
  const reminderRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(reminderTitle);
  const [date, setDate] = useState<TDate>(reminderDate);
  const isReminder = reminderId !== '';
  const isTitle = title !== '';

  const createReminder = useCallback(() => {
    if (!isReminder && isTitle) {
      onChange(EAction.Create, { ...reminder, title, date });

      setTitle('');
      setDate(null);
      setExpanded(false);
    }
  }, [isReminder, isTitle, title, reminder, date, onChange]);

  useEffect(() => {
    if (!expanded) {
      createReminder();
    }
  }, [expanded, createReminder]);

  const handleClickOutside = () => setExpanded(false);

  const { setListenerToDocument } = useOutsideClick(
    reminderRef,
    handleClickOutside,
  );

  const handleFocusTitle = () => {
    setExpanded(true);
    setListenerToDocument();
  };

  const handleChangeDate: TOnChangeDate = (date) => {
    if (date === null || !Array.isArray(date)) {
      if (isTitle) {
        setDate(date);
      }

      if (isReminder) {
        onChange(EAction.Update, { ...reminder, date });
      }
    }
  };

  const handleChangeCompleteCustom: TOnChangeCompleteCustom = () => {
    setExpanded(false);

    onChange(EAction.Update, {
      ...reminder,
      complete: !reminderComplete,
    });
  };

  const handleDelete = () => onChange(EAction.Delete, reminder);

  const handleChangeTitle: TOnChangeTitle = ({ target: { value } }) =>
    setTitle(value);

  const handleBlurTitle: TOnBlurTitle = () => {
    if (isReminder && !isTitle) {
      return setTitle(reminderTitle);
    }

    if (isReminder) {
      return onChange(EAction.Update, { ...reminder, title });
    }
  };

  const handleKeyDownTitle: TOnKeyDownTitle = ({ key }) => {
    const { current: input } = titleRef;

    if (key === 'Enter' && input !== null) {
      input.blur();
      createReminder();
    }
  };

  return {
    title,
    date,
    expanded,
    reminderRef,
    titleRef,
    onKeyDownTitle: handleKeyDownTitle,
    onChangeTitle: handleChangeTitle,
    onFocusTitle: handleFocusTitle,
    onBlurTitle: handleBlurTitle,
    onDelete: handleDelete,
    onChangeDate: handleChangeDate,
    onChangeCompleteCustom: handleChangeCompleteCustom,
  };
};
