import styled from 'styled-components';

type CommonProps = {
  checked: boolean;
};

export const Icon = styled.svg<CommonProps>`
  fill: none;
  stroke: ${({ checked }) => (checked ? '#9c9c9d' : '#5b5b5c')};
  stroke-width: 2px;
  opacity: 0;
  transition: 0.25s;
`;

export const Input = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
`;

export const Polyline = styled.polyline``;

export const CustomCheckbox = styled.div<CommonProps>`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 2px solid;
  border-radius: 8px;
  border-color: ${({ checked }) => (checked ? 'transparent' : '#9c9c9d')};
  box-shadow: 0 0 0 2px transparent;
  cursor: pointer;
  transition: 0.25s;

  ${Input}:focus + & {
    outline: 1px auto #005fcc;
  }

  ${Icon} {
    opacity: ${({ checked }) => (checked ? '1' : '0')};
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

export const Label = styled.label`
  position: relative;

  &:hover {
    & ${CustomCheckbox} {
      border: 2px solid #9c9c9d;
    }

    & ${Icon} {
      opacity: 1;
      visibility: visible;
    }
  }
`;
