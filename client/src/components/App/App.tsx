import React, { FC } from 'react';

import { TReminder } from '../../apollo/reminder/reminder.types';
import { TOnChange as TonChangeGroupByDateDate } from '../Select/Select.types';
import { Reminder } from '../Reminder/Reminder';
import { Select } from '../Select/Select';
import { SELECT_DATA, useApp } from './App.hook';
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
  Group,
  GroupTitle,
} from './App.styles';
import {
  TActionFactory,
  TData,
  TGenerateDateFormat,
  TGroup,
  TOnToggleShowAll,
} from './App.types';

interface ICommonArgs {
  dateFormat: TGenerateDateFormat;
  actionFactory: TActionFactory;
}

interface IRenderContentArgs extends ICommonArgs {
  data: TData;
  loading: boolean;
}

interface IRenderDataArgs extends ICommonArgs {
  data: TData;
}

interface IRenderGroupArgs extends ICommonArgs {
  group: TGroup;
}

type TRenderReminders = (
  reminders: TReminder[],
  actionFactory: TActionFactory,
) => JSX.Element;

type TRenderReminder = (
  reminder: TReminder,
  actionFactory: TActionFactory,
) => JSX.Element;

type TRenderContent = (args: IRenderContentArgs) => JSX.Element;

type TRenderHeaderArgs = {
  tasksNumber: number;
  buttonName: string;
  onToggleShowAll: TOnToggleShowAll;
  onChangeGroupByDate: TonChangeGroupByDateDate;
};

type TRenderHeader = (args: TRenderHeaderArgs) => JSX.Element;

type TRenderData = (args: IRenderDataArgs) => JSX.Element | JSX.Element[];

type TRenderGroup = (args: IRenderGroupArgs) => JSX.Element[];

const renderReminder: TRenderReminder = (reminder, actionFactory) => {
  const { id } = reminder;

  return (
    <ListItem>
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

const renderGroup: TRenderGroup = ({ group, dateFormat, actionFactory }) =>
  Object.keys(group).map((key) => {
    const reminder = group[key];

    return (
      <Group key={key}>
        <GroupTitle>{dateFormat(reminder[0].date)}</GroupTitle>
        {renderReminders(reminder, actionFactory)}
      </Group>
    );
  });

const renderData: TRenderData = ({ data, dateFormat, actionFactory }) => {
  if (Array.isArray(data)) return renderReminders(data, actionFactory);

  return renderGroup({ group: data, dateFormat, actionFactory });
};

const renderContent: TRenderContent = ({
  data,
  loading,
  dateFormat,
  actionFactory,
}) => {
  if (loading) return <Loading>Loading ...</Loading>;

  if (Array.isArray(data))
    return <Content>{renderReminders(data, actionFactory)}</Content>;

  return <Content>{renderData({ data, dateFormat, actionFactory })}</Content>;
};

const renderHeader: TRenderHeader = ({
  tasksNumber,
  buttonName,
  onToggleShowAll,
  onChangeGroupByDate,
}) => (
  <Header>
    <Title>Reminders</Title>
    <Info>
      <TasksNumber>{tasksNumber} Tasks</TasksNumber>
      <Select options={SELECT_DATA} onChange={onChangeGroupByDate} />
      <Button onClick={onToggleShowAll}>{buttonName}</Button>
    </Info>
  </Header>
);

export const App: FC = () => {
  const {
    data,
    error,
    loading,
    buttonName,
    tasksNumber,
    dateFormat,
    actionFactory,
    onToggleShowAll,
    onChangeGroupByDate,
  } = useApp();

  if (error) return <Error>{error.message}</Error>;

  return (
    <Main>
      <Container>
        {renderHeader({
          tasksNumber,
          buttonName,
          onToggleShowAll,
          onChangeGroupByDate,
        })}
        {renderContent({ data, loading, dateFormat, actionFactory })}
      </Container>
    </Main>
  );
};
