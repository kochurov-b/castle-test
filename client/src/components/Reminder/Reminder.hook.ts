import { MutableRefObject, useRef, useState } from 'react';

import { useOutsideClick } from '../../hooks/useOutsideClick.hook';
import { TOnChangeDate, TOnChangeDateSingle } from './Reminder.types';

type TUseReminderExpected = {
  expanded: boolean;
  reminderRef: MutableRefObject<HTMLDivElement | null>;
  onFocusInput: () => void;
  onChangeDateSingle: TOnChangeDateSingle;
  onChangeCompleteCustom: () => void;
};

type TUseReminder = (
  onChangeDate: TOnChangeDate,
  onChangeComplete: () => void,
) => TUseReminderExpected;

export const useReminder: TUseReminder = (onChangeDate, onChangeComplete) => {
  const reminderRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

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
    if (date === null || !Array.isArray(date)) {
      onChangeDate(date);
    }
  };

  const handleChangeCompleteCustom = () => {
    setExpanded(false);
    onChangeComplete();
  };

  return {
    expanded,
    reminderRef,
    onFocusInput: handleFocusInput,
    onChangeDateSingle: handleChangeDateSingle,
    onChangeCompleteCustom: handleChangeCompleteCustom,
  };
};
