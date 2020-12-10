import {
  ApolloError,
  MutationUpdaterFn,
  useMutation,
} from '@apollo/react-hooks';

import { TReminder } from '../../reminder.types';
import { CREATE_REMINDER } from './createReminder.query';

type TData = {
  createReminder: TReminder;
};

type TInput = {
  title: string;
  date: Date | null;
  complete: boolean;
};

type TVariables = {
  input: TInput;
};

type TCreateReminder = (args: TInput) => void;

type TExpected = {
  loading: boolean;
  error: ApolloError | undefined;
  createdReminder: TReminder | null;
  createReminder: TCreateReminder;
};

const update: MutationUpdaterFn<TData> | undefined = (cache, { data }) => {
  cache.modify({
    fields: {
      reminders: (existingRemindersRefs, { toReference }) => {
        if (data) {
          const { createReminder } = data;

          return [...existingRemindersRefs, toReference(createReminder)];
        }
      },
    },
  });
};

export const useMutationCreateReminder = (): TExpected => {
  const [handlerCreateReminder, { loading, error, data }] = useMutation<
    TData,
    TVariables
  >(CREATE_REMINDER);
  const createdReminder = data ? data.createReminder : null;

  const createReminder: TCreateReminder = ({ title, date, complete }) => {
    const variables: TVariables = { input: { title, date, complete } };

    handlerCreateReminder({
      variables,
      update,
    });
  };

  return { loading, error, createdReminder, createReminder };
};
