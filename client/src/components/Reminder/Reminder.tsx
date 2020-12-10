import React, { FC, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Checkbox } from '../Checkbox/Checkbox';
import {
  Content,
  Main,
  Header,
  Input,
  Actions,
  DateView,
  DeleteButton,
  Path,
  Icon,
} from './Reminder.styles';
import {
  TOnChangeDate,
  TOnDelete,
  TOnChangeDateSingle,
  TDate,
} from './Reminder.types';
import { useReminder } from './Reminder.hook';

interface ICommonProps {
  title: string;
  date: TDate;
  complete: boolean;
}

interface IProps extends ICommonProps {
  id: number;
  onDelete: TOnDelete;
  onChangeComplete: () => void;
  onChangeDate: TOnChangeDate;
}

interface IRenderHeaderArgs extends ICommonProps {
  onFocusInput: () => void;
}

type TRenderActionsArgs = {
  expanded: boolean;
  date: TDate;
  onChangeDateSingle: TOnChangeDateSingle;
};

type TRenderHeader = (args: IRenderHeaderArgs) => JSX.Element;

type TRenderActions = (args: TRenderActionsArgs) => JSX.Element;

type TRenderDeleteButton = (id: number, onDelete: TOnDelete) => JSX.Element;

type TGenerateDateFormat = (date: TDate) => string;

const generateDateFormat: TGenerateDateFormat = (date) => {
  if (date !== null) {
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    return `${day} ${month}`;
  }

  return '';
};

const renderHeader: TRenderHeader = ({
  title,
  date,
  complete,
  onFocusInput,
}) => (
  <Header>
    <Input
      complete={complete}
      defaultValue={title}
      onFocus={onFocusInput}
      disabled={complete}
    />
    {date && <DateView>{generateDateFormat(date)}</DateView>}
  </Header>
);

const renderActions: TRenderActions = ({
  expanded,
  date,
  onChangeDateSingle,
}) => (
  <Actions expanded={expanded}>
    <DatePicker
      isClearable
      selected={date}
      shouldCloseOnSelect={false}
      onChange={onChangeDateSingle}
      minDate={new Date()}
      dateFormat="dd/MM/yyyy"
      placeholderText="Add date"
    />
  </Actions>
);

const renderDeleteButton: TRenderDeleteButton = (id, onDelete) => (
  <DeleteButton onClick={() => onDelete(id)}>
    <Icon viewBox="0 0 40 40">
      <Path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </Icon>
  </DeleteButton>
);

export const Reminder: FC<IProps> = memo(
  ({ id, title, date, complete, onDelete, onChangeComplete, onChangeDate }) => {
    const {
      expanded,
      reminderRef,
      onFocusInput,
      onChangeDateSingle,
      onChangeCompleteCustom,
    } = useReminder(onChangeDate, onChangeComplete);

    return (
      <Main complete={complete} ref={reminderRef}>
        <Checkbox
          checked={complete}
          onChange={() => onChangeCompleteCustom()}
        />
        <Content>
          {renderHeader({
            title,
            date,
            complete,
            onFocusInput,
          })}
          {renderActions({
            expanded,
            date,
            onChangeDateSingle,
          })}
        </Content>
        {renderDeleteButton(id, onDelete)}
      </Main>
    );
  },
);
