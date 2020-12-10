import { MouseEvent } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { EAction } from '../Reminder/Reminder.types';

export type TActionFactory = (
  reminder: TReminder,
) => Record<EAction, () => void>;

export type TOnToggleShowAll = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
) => void;
