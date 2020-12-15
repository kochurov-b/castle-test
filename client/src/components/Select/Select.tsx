import React, { FC, memo } from 'react';

import { Select as SelectUI, Option } from './Select.styles';
import { TOnChange, TOption } from './Select.types';

type TProps = {
  options: TOption[];
  onChange: TOnChange;
};

type TRenderOption = (option: TOption) => JSX.Element;

const renderOption: TRenderOption = ({ label, value }) => (
  <Option key={value} value={value}>
    {label}
  </Option>
);

export const Select: FC<TProps> = memo(({ options, onChange }) => (
  <SelectUI onChange={onChange}>{options.map(renderOption)}</SelectUI>
));
