import { IResolvers } from 'apollo-server-express';

import { Reminder } from '../models/Reminder';
import { scalarsTypes } from './graphql.scalars';

export const resolvers: IResolvers = {
  Query: {
    reminders: async () => {
      try {
        return await Reminder.find();
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createReminder: async (root, { input: data }) => {
      try {
        const reminder = new Reminder(data);

        await reminder.save();

        return reminder;
      } catch (error) {
        console.error(error);
      }
    },
    updateReminder: async (root, { id, input: updated }) => {
      try {
        const conditions = { _id: id };
        const options = { new: true };

        return await Reminder.findByIdAndUpdate(conditions, updated, options);
      } catch (error) {
        console.error(error);
      }
    },
    deleteReminder: async (parent, { id }) => {
      try {
        const conditions = { _id: id };

        return await Reminder.findByIdAndDelete(conditions);
      } catch (error) {
        console.error(error);
      }
    },
  },
  ...scalarsTypes,
};
