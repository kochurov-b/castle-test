import { ChangeEvent } from 'react';

export type TOption = {
  label: string;
  value: string;
};

export type TOnChange = (e: ChangeEvent<HTMLSelectElement>) => void;
