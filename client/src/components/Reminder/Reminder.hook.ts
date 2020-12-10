import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { useOutsideClick } from '../../hooks/useOutsideClick.hook';
import {
  EAction,
  TOnBlurTitle,
  TOnChange,
  TOnChangeCompleteCustom,
  TOnChangeDateSingle,
  TOnChangeTitle,
} from './Reminder.types';

export const DEFAULT_REMINDER = {
  id: '',
  title: '',
  date: null,
  complete: false,
};

type TUseReminderExpected = {
  title: string;
  expanded: boolean;
  reminderRef: MutableRefObject<HTMLDivElement | null>;
  onChangeTitle: TOnChangeTitle;
  onFocusInput: () => void;
  onBlurTitle: TOnBlurTitle;
  onDelete: () => void;
  onChangeDateSingle: TOnChangeDateSingle;
  onChangeCompleteCustom: TOnChangeCompleteCustom;
};

type TUseReminder = (
  reminder: TReminder,
  onChange: TOnChange,
) => TUseReminderExpected;

export const useReminder: TUseReminder = (reminder, onChange) => {
  const { title: initialTitle } = reminder;
  const reminderRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(initialTitle);

  const handleClickOutside = () => setExpanded(false);

  const { setListenerToDocument } = useOutsideClick(
    reminderRef,
    handleClickOutside,
  );

  const handleFocusInput = () => {
    setExpanded(true);
    setListenerToDocument();
  };

  const handleChangeDateSingle: TOnChangeDateSingle = (date) => {
    const { id: reminderId } = reminder;

    if ((date === null || !Array.isArray(date)) && reminderId !== '') {
      onChange(EAction.Update, { ...reminder, date });
    }
  };

  const handleChangeCompleteCustom = (e: ChangeEvent<HTMLInputElement>) => {
    setExpanded(false);

    onChange(EAction.Update, {
      ...reminder,
      complete: !reminder.complete,
    });
  };

  const handleDelete = () => onChange(EAction.Delete, reminder);

  const handleChangeTitle: TOnChangeTitle = ({ target: { value } }) =>
    setTitle(value);

  const handleBlurTitle: TOnBlurTitle = () => {
    const { id: reminderId, title: reminderTitle } = reminder;

    if (reminderId !== '' && title === '') {
      return setTitle(reminderTitle);
    }

    if (reminderId !== '') {
      return onChange(EAction.Update, { ...reminder, title });
    }

    if (reminderId === '' && title !== '') {
      onChange(EAction.Create, { ...reminder, title });

      setTitle('');
      setExpanded(false);
    }
  };

  return {
    title,
    expanded,
    reminderRef,
    onChangeTitle: handleChangeTitle,
    onFocusInput: handleFocusInput,
    onBlurTitle: handleBlurTitle,
    onDelete: handleDelete,
    onChangeDateSingle: handleChangeDateSingle,
    onChangeCompleteCustom: handleChangeCompleteCustom,
  };
};
