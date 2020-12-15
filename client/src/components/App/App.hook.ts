import { useEffect, useMemo, useState } from 'react';
import { ApolloError } from '@apollo/client';
import moment from 'moment';

import { useMutationCreateReminder } from '../../apollo/reminder/mutation/createReminder/createReminder';
import { useMutationDeleteReminder } from '../../apollo/reminder/mutation/deleteReminder/deleteReminder';
import { useMutationUpdateReminder } from '../../apollo/reminder/mutation/updateReminder/updateReminder';
import { useQueryGetReminders } from '../../apollo/reminder/query/getReminders/getReminders';
import { TReminder } from '../../apollo/reminder/reminder.types';
import { useGroupByDate } from '../../hooks/useGroupByDate/useGroupByDate';
import { EGroup } from '../../hooks/useGroupByDate/useGroupByDate.types';
import {
  TOnChange as TonChangeGroupByDateDate,
  TOption,
} from '../Select/Select.types';
import { DEFAULT_REMINDER } from '../Reminder/Reminder.hook';
import { EAction } from '../Reminder/Reminder.types';
import {
  TActionFactory,
  TData,
  TGenerateDateFormat,
  TOnToggleShowAll,
} from './App.types';

export const SELECT_DATA: TOption[] = [
  {
    label: 'None',
    value: '',
  },
  {
    label: EGroup.Day,
    value: EGroup.Day,
  },
  {
    label: EGroup.Week,
    value: EGroup.Week,
  },
  {
    label: EGroup.Month,
    value: EGroup.Month,
  },
];

type TUseAppExpected = {
  data: TData;
  error: ApolloError | undefined;
  loading: boolean;
  buttonName: string;
  tasksNumber: number;
  dateFormat: TGenerateDateFormat;
  actionFactory: TActionFactory;
  onToggleShowAll: TOnToggleShowAll;
  onChangeGroupByDate: TonChangeGroupByDateDate;
};

type TUpdateDataToShow = (data: TReminder[], showAll: boolean) => TReminder[];

type TCreateReminderAdding = (data: TData) => TData;

type TDateFormatFactoryExpected = {
  [EGroup.Day]: () => string;
  [EGroup.Week]: () => string;
  [EGroup.Month]: () => string;
};

type TDateFormatFactory = (data: Date) => TDateFormatFactoryExpected;

const updateDataToShow: TUpdateDataToShow = (data, showAll) => {
  const newData = [...data];

  if (showAll) return newData.sort((a, b) => (b.complete ? -1 : 1));

  return newData.filter(({ complete }) => !complete);
};

const createReminderAdding: TCreateReminderAdding = (data) => {
  if (Array.isArray(data)) {
    return [...data, DEFAULT_REMINDER];
  }

  const newData = { ...data };
  const dataKeys = Object.keys(data);
  const lastKey = dataKeys[dataKeys.length - 1];

  return {
    ...data,
    [lastKey]: [...newData[lastKey], DEFAULT_REMINDER],
  };
};

const dateFormatFactory: TDateFormatFactory = (dateTime) => ({
  [EGroup.Day]: () => `${moment(dateTime).format('DD MMMM')}`,
  [EGroup.Week]: () => {
    const startWeek = moment(dateTime).startOf('week').format('DD MMMM');
    const endWeek = moment(dateTime).endOf('week').format('DD MMMM');

    return `${startWeek} - ${endWeek}`;
  },
  [EGroup.Month]: () => `${moment(dateTime).format('MMMM YYYY')}`,
});

export const useApp = (): TUseAppExpected => {
  const { reminders, loading, error, getReminders } = useQueryGetReminders();
  const { createReminder } = useMutationCreateReminder();
  const { updateReminder } = useMutationUpdateReminder();
  const { deleteReminder } = useMutationDeleteReminder();
  const [showAll, setShowAll] = useState<boolean>(false);

  const {
    data,
    groupBy,
    onChange: onChangeGroupByDate,
  } = useGroupByDate<TReminder>(updateDataToShow(reminders, showAll));

  const buttonName: string = useMemo(() => (showAll ? 'Hide' : 'Show'), [
    showAll,
  ]);

  const tasksNumber: number = useMemo(
    () => reminders.filter(({ complete }) => !complete).length,
    [reminders],
  );

  useEffect(() => {
    getReminders();
  }, [getReminders]);

  const handleToggleShowAll: TOnToggleShowAll = () =>
    setShowAll((prevState) => !prevState);

  const actionFactory: TActionFactory = (reminder) => {
    const { id, title, date, complete } = reminder;

    return {
      [EAction.Create]: () => createReminder({ title, date, complete }),
      [EAction.Update]: () => updateReminder(reminder),
      [EAction.Delete]: () => deleteReminder(id),
    };
  };

  const generateDateFormat: TGenerateDateFormat = (date) => {
    if (date === null || groupBy === '') return 'Without date';

    return dateFormatFactory(date)[groupBy as EGroup]();
  };

  return {
    data: createReminderAdding(data),
    error,
    loading,
    buttonName,
    tasksNumber,
    dateFormat: generateDateFormat,
    onChangeGroupByDate,
    actionFactory: actionFactory,
    onToggleShowAll: handleToggleShowAll,
  };
};
