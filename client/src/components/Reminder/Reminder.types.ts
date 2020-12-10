import { ChangeEvent, SyntheticEvent, FocusEvent } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';

export enum EAction {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export type TOnChangeDateSingle = (
  date: Date | [Date, Date] | null,
  event: SyntheticEvent<any, Event> | undefined,
) => void;

export type TDate = Date | null;

export type TOnChange = (action: EAction, reminder: TReminder) => void;

export type TOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => void;

export type TOnBlurTitle = (e: FocusEvent<HTMLInputElement>) => void;

export type TOnChangeCompleteCustom = (
  e: ChangeEvent<HTMLInputElement>,
) => void;
