import { useState } from 'react';

import { TOnChangeComplete, TOnChangeDate, TReminder } from './App.types';

const data: TReminder[] = [
  {
    id: 1,
    title: 'Go to the hair',
    complete: false,
  },
  {
    id: 3,
    title: 'Go home',
    date: new Date(),
    complete: true,
  },
  {
    id: 2,
    title: 'Hello',
    complete: false,
  },
];

type TUseAppExpected = {
  reminders: TReminder[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onChangeComplete: TOnChangeComplete;
  onChangeDate: TOnChangeDate;
};

export const useApp = (): TUseAppExpected => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [reminders, setReminders] = useState<TReminder[]>(
    data.sort((a, b) => (b.complete ? -1 : 1)),
  );

  const handleToggleShowAll = () => setShowAll((prevState) => !prevState);

  const handleChangeComplete: TOnChangeComplete = (index) => {
    setReminders((prevState) => {
      const newState = [...prevState];
      const reminder = {
        ...newState[index],
        complete: !newState[index].complete,
      };
      newState.splice(index, 1);

      return reminder.complete
        ? [...newState, reminder]
        : [reminder, ...newState];
    });
  };

  const handleChangeDate: TOnChangeDate = (date, index) => {
    setReminders((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        date,
      };

      return newState;
    });
  };

  return {
    reminders,
    showAll,
    onToggleShowAll: handleToggleShowAll,
    onChangeComplete: handleChangeComplete,
    onChangeDate: handleChangeDate,
  };
};
