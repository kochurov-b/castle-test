import { MouseEvent } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { EAction, TDate } from '../Reminder/Reminder.types';

export type TActionFactory = (
  reminder: TReminder,
) => Record<EAction, () => void>;

export type TOnToggleShowAll = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
) => void;

export type TGenerateDateFormat = (date: TDate) => string;

export type TGroup = Record<string, TReminder[]>;

export type TData = TReminder[] | TGroup;
