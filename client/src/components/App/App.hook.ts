import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';

import { useMutationCreateReminder } from '../../apollo/reminder/mutation/createReminder/createReminder';
import { useMutationDeleteReminder } from '../../apollo/reminder/mutation/deleteReminder/deleteReminder';
import { useMutationUpdateReminder } from '../../apollo/reminder/mutation/updateReminder/updateReminder';
import { useQueryGetReminders } from '../../apollo/reminder/query/getReminders/getReminders';
import { TReminder } from '../../apollo/reminder/reminder.types';
import { EAction } from '../Reminder/Reminder.types';
import { TActionFactory, TOnToggleShowAll } from './App.types';

type TUseAppExpected = {
  reminders: TReminder[];
  error: ApolloError | undefined;
  showAll: boolean;
  loading: boolean;
  onToggleShowAll: TOnToggleShowAll;
  actionFactory: TActionFactory;
};

export const useApp = (): TUseAppExpected => {
  const { reminders, loading, error, getReminders } = useQueryGetReminders();
  const { createReminder } = useMutationCreateReminder();
  const { updateReminder } = useMutationUpdateReminder();
  const { deleteReminder } = useMutationDeleteReminder();
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    getReminders();
  }, [getReminders]);

  const handleToggleShowAll: TOnToggleShowAll = () =>
    setShowAll((prevState) => !prevState);

  const actionFactory: TActionFactory = (reminder) => ({
    [EAction.Create]: () => {
      const { title, date, complete } = reminder;

      createReminder({ title, date, complete });
    },
    [EAction.Update]: () => updateReminder(reminder),
    [EAction.Delete]: () => {
      const { id } = reminder;

      return deleteReminder(id);
    },
  });

  return {
    reminders,
    error,
    showAll,
    loading,
    onToggleShowAll: handleToggleShowAll,
    actionFactory: actionFactory,
  };
};
