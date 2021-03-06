import React, { FC, memo, MouseEvent } from 'react';
import moment from 'moment';

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
  Plus,
  PlusPath,
  PlusSvg,
  DatePicker,
} from './Reminder.styles';
import {
  TOnChangeDate,
  TDate,
  TOnChange,
  TOnChangeTitle,
  TOnBlurTitle,
  TOnChangeCompleteCustom,
  TOnKeyDownTitle,
  TTitleRef,
} from './Reminder.types';
import { useReminder } from './Reminder.hook';
import { TReminder } from '../../apollo/reminder/reminder.types';

type TProps = {
  reminder: TReminder;
  onChange: TOnChange;
};

type TRenderHeaderArgs = {
  title: string;
  date: TDate;
  complete: boolean;
  titleRef: TTitleRef;
  onKeyDownTitle: TOnKeyDownTitle;
  onChangeTitle: TOnChangeTitle;
  onFocusTitle: () => void;
  onBlurTitle: TOnBlurTitle;
};

type TRenderActionsArgs = {
  expanded: boolean;
  date: TDate;
  onChangeDate: TOnChangeDate;
};

type TRenderHeader = (args: TRenderHeaderArgs) => JSX.Element;

type TRenderActions = (args: TRenderActionsArgs) => JSX.Element;

type TRenderDeleteButton = (onDelete: TOnDelete) => JSX.Element;

type TGenerateDateFormat = (date: TDate) => string;

type TOnDelete = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
) => void;

type TRenderIconArgs = {
  isReminderCreate: boolean;
  complete: boolean;
  onChangeCompleteCustom: TOnChangeCompleteCustom;
};

type TRenderIcon = (args: TRenderIconArgs) => JSX.Element;

const generateDateFormat: TGenerateDateFormat = (dateTime) => {
  if (dateTime === null) {
    return '';
  }

  return moment(dateTime).format('DD MMMM');
};

const renderHeader: TRenderHeader = ({
  title,
  date,
  complete,
  titleRef,
  onKeyDownTitle,
  onChangeTitle,
  onFocusTitle,
  onBlurTitle,
}) => (
  <Header>
    <Input
      ref={titleRef}
      complete={complete}
      value={title}
      onKeyDown={onKeyDownTitle}
      onChange={onChangeTitle}
      onFocus={onFocusTitle}
      onBlur={onBlurTitle}
      disabled={complete}
    />
    <DateView date={date}>{generateDateFormat(date)}</DateView>
  </Header>
);

const renderActions: TRenderActions = ({ expanded, date, onChangeDate }) => (
  <Actions expanded={expanded}>
    <DatePicker
      isClearable
      selected={date}
      onChange={onChangeDate}
      minDate={moment().toDate()}
      dateFormat="dd/MM/yyyy"
      placeholderText="Add date"
    />
  </Actions>
);

const renderDeleteButton: TRenderDeleteButton = (onDelete) => (
  <DeleteButton onClick={onDelete}>
    <Icon viewBox="0 0 40 40">
      <Path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </Icon>
  </DeleteButton>
);

const renderIconPlus = () => (
  <Plus>
    <PlusSvg viewBox="0 0 24 24">
      <PlusPath d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></PlusPath>
    </PlusSvg>
  </Plus>
);

const renderIcon: TRenderIcon = ({
  isReminderCreate,
  complete,
  onChangeCompleteCustom,
}) =>
  isReminderCreate ? (
    renderIconPlus()
  ) : (
    <Checkbox checked={complete} onChange={onChangeCompleteCustom} />
  );

export const Reminder: FC<TProps> = memo(({ reminder, onChange }) => {
  const { id, complete } = reminder;
  const isReminderCreate: boolean = id === '';

  const {
    date,
    title,
    expanded,
    reminderRef,
    titleRef,
    onDelete,
    onKeyDownTitle,
    onChangeTitle,
    onFocusTitle,
    onBlurTitle,
    onChangeDate,
    onChangeCompleteCustom,
  } = useReminder(reminder, onChange);

  return (
    <Main complete={complete} ref={reminderRef}>
      {renderIcon({ isReminderCreate, complete, onChangeCompleteCustom })}
      <Content>
        {renderHeader({
          title,
          date,
          complete,
          titleRef,
          onKeyDownTitle,
          onChangeTitle,
          onFocusTitle,
          onBlurTitle,
        })}
        {renderActions({
          expanded,
          date,
          onChangeDate,
        })}
      </Content>
      {!isReminderCreate && renderDeleteButton(onDelete)}
    </Main>
  );
});
