import { SyntheticEvent } from 'react';

export type TOnChangeDate = (data: Date | null) => void;

export type TOnDelete = (id: number) => void;

export type TOnChangeDateSingle = (
  date: Date | [Date, Date] | null,
  event: SyntheticEvent<any, Event> | undefined,
) => void;

export type TDate = Date | null;
