import {
  ApolloError,
  QueryLazyOptions,
  useLazyQuery,
} from '@apollo/react-hooks';

import { TReminder } from '../../reminder.types';
import { GET_REMINDERS } from './getReminders.query';

type TData = {
  reminders: TReminder[];
};

type Expected = {
  loading: boolean;
  error: ApolloError | undefined;
  reminders: TReminder[];
  getReminders: (
    options?: QueryLazyOptions<Record<string, any>> | undefined,
  ) => void;
};

export const useQueryGetReminders = (): Expected => {
  const [getReminders, { loading, error, data }] = useLazyQuery<TData>(
    GET_REMINDERS,
  );

  const reminders = (data && data.reminders) || [];

  return { loading, error, reminders, getReminders };
};
