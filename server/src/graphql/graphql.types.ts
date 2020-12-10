import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Reminder {
    id: ID!
    title: String!
    date: Date
    complete: Boolean
  }

  input Input {
    title: String!
    date: Date
    complete: Boolean
  }

  type Query {
    reminders: [Reminder!]
  }

  type Mutation {
    createReminder(input: Input!): Reminder!
    updateReminder(id: ID!, input: Input!): Reminder!
    deleteReminder(id: ID!): Reminder!
  }
`;
