import React, { ChangeEvent, FC, memo } from 'react';

import {
  Input,
  Label,
  Icon,
  Polyline,
  CustomCheckbox,
} from './Checkbox.styles';

type TProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TRenderCustomCheckbox = (checked: boolean) => JSX.Element;

const renderCustomCheckbox: TRenderCustomCheckbox = (checked) => (
  <CustomCheckbox checked={checked}>
    <Icon checked={checked} viewBox="0 0 24 24">
      <Polyline points="20 6 9 17 4 12" />
    </Icon>
  </CustomCheckbox>
);

export const Checkbox: FC<TProps> = memo(({ checked, onChange }) => (
  <Label>
    <Input onChange={onChange} />
    {renderCustomCheckbox(checked)}
  </Label>
));
