import { useState } from 'react';
import moment, { Moment } from 'moment';

import { EGroup } from './useGroupByDate.types';
import { TOnChange } from '../../components/Select/Select.types';

interface IDataValue {
  date: Date | null;
}

type TGroupBy = EGroup | '';

type TGroup<T> = Record<string, T>;

type TGenerateGroup<T> = Record<string, T[]>;

type TGetDate = (date: Moment) => string;

type TUseGroupByDateExpected<T> = {
  groupBy: TGroupBy;
  data: T[] | TGenerateGroup<T>;
  onChange: TOnChange;
};

const getDay: TGetDate = (date) => moment(date).startOf('day').format();

const getWeek: TGetDate = (date) =>
  `${moment(date).year()} - ${moment(date).week()}`;

const getMonth: TGetDate = (date) => moment(date).startOf('month').format();

const generateGroup = <T extends IDataValue>(
  value: T,
  getDate: TGetDate,
): TGroup<T> => {
  const date = moment(value.date as Date);

  return {
    [getDate(date)]: {
      ...value,
    },
  };
};

const generateGroups = <T>(
  data: T[],
  group: (value: T) => TGroup<T>,
): TGenerateGroup<T> =>
  data.reduce((acc, item) => {
    const value = group(item);
    const date = Object.keys(value)[0];

    if (acc[date]) {
      return {
        ...acc,
        [date]: [...acc[date], item],
      };
    }

    return {
      ...acc,
      [date]: [item],
    };
  }, {} as TGenerateGroup<T>);

const groupFactory = <T extends IDataValue>() => ({
  [EGroup.Day]: (item: T) => generateGroup<T>(item, getDay),
  [EGroup.Week]: (item: T) => generateGroup<T>(item, getWeek),
  [EGroup.Month]: (item: T) => generateGroup<T>(item, getMonth),
});

const generateData = <T extends IDataValue>(
  data: T[],
  groupBy: TGroupBy,
): T[] | TGenerateGroup<T> => {
  const group = groupFactory<T>()[groupBy as EGroup];

  if (groupBy === '' || !group) return data;

  return generateGroups<T>(data, group);
};

export const useGroupByDate = <T extends IDataValue>(
  data: T[],
): TUseGroupByDateExpected<T> => {
  const [groupBy, setGroupBy] = useState<TGroupBy>('');

  const handleChange: TOnChange = ({ target: { value } }) =>
    setGroupBy(value as EGroup);

  return {
    groupBy,
    data: generateData<T>(data, groupBy),
    onChange: handleChange,
  };
};
