import React, { FC } from 'react';

import { Reminder } from '../Reminder/Reminder';
import {
  TOnChangeDate as TOnChangeDateReminder,
  TOnDelete as TOnDeleteReminder,
} from '../Reminder/Reminder.types';
import { useApp } from './App.hook';
import {
  Button,
  Container,
  Count,
  Header,
  Info,
  List,
  ListItem,
  Main,
  Title,
} from './App.styles';
import { TOnChangeComplete, TOnChangeDate, TReminder } from './App.types';

type TRenderRemindersArgs = {
  reminders: TReminder[];
  onChangeComplete: TOnChangeComplete;
  onChangeDate: TOnChangeDate;
};

type TRenderReminders = (args: TRenderRemindersArgs) => JSX.Element;

type TRenderReminderArgs = {
  reminder: TReminder;
  onDelete: TOnDeleteReminder;
  onChangeComplete: () => void;
  onChangeDate: TOnChangeDateReminder;
};

type TRenderReminder = (args: TRenderReminderArgs) => JSX.Element;

type TUpdateDataToShow = (data: TReminder[], showAll: boolean) => TReminder[];

const renderReminder: TRenderReminder = ({
  reminder,
  onDelete,
  onChangeComplete,
  onChangeDate,
}) => {
  const { id, date } = reminder;

  return (
    <ListItem key={id}>
      <Reminder
        {...reminder}
        date={date || null}
        onDelete={onDelete}
        onChangeComplete={onChangeComplete}
        onChangeDate={onChangeDate}
      />
    </ListItem>
  );
};

const renderReminders: TRenderReminders = ({
  reminders,
  onChangeComplete,
  onChangeDate,
}) => (
  <List>
    {reminders.map((reminder, index) => {
      const handleDelete: TOnDeleteReminder = (id) => {
        console.log(id, index);
      };

      const handleChangeCompleteCustom = () => onChangeComplete(index);

      const handleChangeDateCustom: TOnChangeDateReminder = (date) =>
        onChangeDate(date, index);

      return renderReminder({
        reminder,
        onDelete: handleDelete,
        onChangeComplete: handleChangeCompleteCustom,
        onChangeDate: handleChangeDateCustom,
      });
    })}
  </List>
);

const updateDataToShow: TUpdateDataToShow = (data, showAll) => {
  if (showAll) return data;

  return data.filter(({ complete }) => !complete);
};

export const App: FC = () => {
  const {
    reminders,
    showAll,
    onToggleShowAll,
    onChangeComplete,
    onChangeDate,
  } = useApp();
  const buttonTitle = showAll ? 'Hide' : 'Show';

  return (
    <Main>
      <Container>
        <Header>
          <Title>Reminders</Title>
          <Info>
            <Count>3 Tasks</Count>
            <Button onClick={() => onToggleShowAll()}>{buttonTitle}</Button>
          </Info>
        </Header>
        {renderReminders({
          reminders: updateDataToShow(reminders, showAll),
          onChangeComplete,
          onChangeDate,
        })}
      </Container>
    </Main>
  );
};
