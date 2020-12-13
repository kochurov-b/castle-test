import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { TDate } from './Reminder.types';

type TActionsProps = {
  expanded: boolean;
};

type TCommonProps = {
  complete: boolean;
};

type TDateView = {
  date: TDate;
};

export const DatePicker = styled(ReactDatePicker)`
  color: #232425;
  border: 0;
  padding: 4px 6px;
  border-radius: 5px;
  background-color: #dddddd;

  & + .react-datepicker__close-icon {
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    padding: 0;
    background-color: #b86464;
    border-radius: 5px;
    transition: 0.25s;

    &::after {
      font-size: 17px;
      padding: 0;
      color: #eaeaea;
      background-color: transparent;
    }

    &:hover {
      background-color: #e66969;
    }
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  padding: 4px;
  background-color: #b86464;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background-color: #e66969;
  }
`;

export const Main = styled.div<TCommonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 30px 15px 24px;
  background-color: ${({ complete }) => (complete ? 'transparent' : '#2e2f30')};
  border: 1px solid #363738;
  border-radius: 15px;
  transition: 0.25s;
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 15px;
`;

export const Header = styled.header``;

export const Input = styled.input.attrs({ type: 'text' })<TCommonProps>`
  width: 100%;
  color: ${({ complete }) => (complete ? '#9c9c9d' : '#eaeaea')};
  font-size: 20px;
  line-height: 25px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0px 6px;
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
  transition: 0.25s;

  &:hover {
    border-color: ${({ complete }) => (complete ? 'transparent' : '#484a4c')};
  }
`;

export const Actions = styled.div<TActionsProps>`
  margin: ${({ expanded }) => (expanded ? '8px 0 0 7px' : '0 0 0 7px')};
  height: ${({ expanded }) => (expanded ? '23px' : '0')};
  opacity: ${({ expanded }) => (expanded ? '1' : '0')};
  visibility: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};
  transition: 0.25s;
`;

export const DateView = styled.span<TDateView>`
  color: #999a9a;
  display: block;
  margin: 4px 0 0 7px;
  height: ${({ date }) => (date === null ? '0' : '18px')};
  opacity: ${({ date }) => (date === null ? '0' : '1')};
  visibility: ${({ date }) => (date === null ? 'hidden' : 'visible')};
  cursor: default;
  transition: 0.25s;
`;

export const Icon = styled.svg``;

export const Path = styled.path`
  stroke: #eaeaea;
  fill: transparent;
  stroke-linecap: round;
  stroke-width: 4;
`;

export const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  border: 2px solid #9c9c9d;
  background-color: #9c9c9d;
  border-radius: 8px;
`;

export const PlusSvg = styled.svg`
  width: 15px;
  height: 15px;
`;

export const PlusPath = styled.path`
  fill: #232425;
`;
