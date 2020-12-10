import { ApolloError, useMutation } from '@apollo/react-hooks';

import { TReminder } from '../../reminder.types';
import { UPDATE_REMINDER } from './updateReminder.query';

type TData = {
  updateReminder: TReminder;
};

type TInput = {
  title: string;
  date: Date | null;
  complete: boolean;
};

type TVariables = {
  id: string;
  input: TInput;
};

type TUpdateReminder = (reminder: TReminder) => void;

type TExpected = {
  loading: boolean;
  error: ApolloError | undefined;
  updatedReminder: TReminder | null;
  updateReminder: TUpdateReminder;
};

export const useMutationUpdateReminder = (): TExpected => {
  const [handlerUpdateReminder, { loading, error, data }] = useMutation<
    TData,
    TVariables
  >(UPDATE_REMINDER);
  const updatedReminder: TReminder | null = data ? data.updateReminder : null;

  const updateReminder: TUpdateReminder = ({ id, title, date, complete }) => {
    handlerUpdateReminder({
      variables: {
        id,
        input: { title, date, complete },
      },
    });
  };

  return { loading, error, updatedReminder, updateReminder };
};
