import {
  ApolloError,
  MutationUpdaterFn,
  useMutation,
} from '@apollo/react-hooks';

import { TReminder } from '../../reminder.types';
import { DELETE_REMINDER } from './deleteReminder.query';

type TData = {
  deleteReminder: TReminder;
};

type TVariables = {
  id: string;
};

type TDeleteReminder = (id: string) => void;

type TExpected = {
  loading: boolean;
  error: ApolloError | undefined;
  deletedReminder: TReminder | null;
  deleteReminder: TDeleteReminder;
};

const update: MutationUpdaterFn<TData> | undefined = (cache) => {
  cache.modify({
    fields: {
      reminders: (existingRemindersRefs, { DELETE }) => DELETE,
    },
  });
};

export const useMutationDeleteReminder = (): TExpected => {
  const [handlerDeleteReminder, { loading, error, data }] = useMutation<
    TData,
    TVariables
  >(DELETE_REMINDER);
  const deletedReminder = data ? data.deleteReminder : null;

  const deleteReminder: TDeleteReminder = (id) => {
    handlerDeleteReminder({
      variables: { id },
      update,
    });
  };

  return { loading, error, deletedReminder, deleteReminder };
};
