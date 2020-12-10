import React, { FC, useMemo } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { Reminder } from '../Reminder/Reminder';
import { DEFAULT_REMINDER } from '../Reminder/Reminder.hook';
import { useApp } from './App.hook';
import {
  Button,
  Container,
  TasksNumber,
  Header,
  Info,
  List,
  ListItem,
  Main,
  Title,
  Content,
  Loading,
  Error,
} from './App.styles';
import { TActionFactory, TOnToggleShowAll } from './App.types';

type TRenderReminders = (
  reminders: TReminder[],
  actionFactory: TActionFactory,
) => JSX.Element;

type TRenderReminder = (
  reminder: TReminder,
  actionFactory: TActionFactory,
) => JSX.Element;

type TUpdateDataToShow = (data: TReminder[], showAll: boolean) => TReminder[];

type TRenderContentArgs = {
  data: TReminder[];
  loading: boolean;
  actionFactory: TActionFactory;
};

type TRenderContent = (args: TRenderContentArgs) => JSX.Element;

type TRenderHeaderArgs = {
  tasksNumber: number;
  buttonName: string;
  onToggleShowAll: TOnToggleShowAll;
};

type TRenderHeader = (args: TRenderHeaderArgs) => JSX.Element;

const renderReminder: TRenderReminder = (reminder, actionFactory) => {
  const { id } = reminder;

  return (
    <ListItem key={id}>
      <Reminder
        reminder={reminder}
        onChange={(action, reminder) => actionFactory(reminder)[action]()}
      />
    </ListItem>
  );
};

const renderReminders: TRenderReminders = (reminders, actionFactory) => (
  <List>
    {reminders.map((reminder) => renderReminder(reminder, actionFactory))}
  </List>
);

const updateDataToShow: TUpdateDataToShow = (data, showAll) => {
  const newData = [...data];
  const lastReminder = data[data.length - 1];
  const isEmptyData = data.length === 0;
  const isLastNotEmpty = lastReminder && lastReminder.title !== '';

  if (isEmptyData || isLastNotEmpty) {
    newData.push(DEFAULT_REMINDER);
  }

  if (showAll) return newData.sort((a, b) => (b.complete ? -1 : 1));

  return newData.filter(({ complete }) => !complete);
};

const renderContent: TRenderContent = ({ data, loading, actionFactory }) => {
  if (loading) return <Loading>Loading ...</Loading>;

  return <Content>{renderReminders(data, actionFactory)}</Content>;
};

const renderHeader: TRenderHeader = ({
  tasksNumber,
  buttonName,
  onToggleShowAll,
}) => (
  <Header>
    <Title>Reminders</Title>
    <Info>
      <TasksNumber>{tasksNumber} Tasks</TasksNumber>
      <Button onClick={onToggleShowAll}>{buttonName}</Button>
    </Info>
  </Header>
);

export const App: FC = () => {
  const {
    reminders,
    error,
    showAll,
    loading,
    onToggleShowAll,
    actionFactory,
  } = useApp();
  const buttonName = useMemo(() => (showAll ? 'Hide' : 'Show'), [showAll]);
  const tasksNumber = useMemo(
    () => reminders.filter(({ complete }) => !complete).length,
    [reminders],
  );
  const data = useMemo(() => updateDataToShow(reminders, showAll), [
    reminders,
    showAll,
  ]);

  if (error) return <Error>{error.message}</Error>;

  return (
    <Main>
      <Container>
        {renderHeader({ tasksNumber, buttonName, onToggleShowAll })}
        {renderContent({ data, loading, actionFactory })}
      </Container>
    </Main>
  );
};
