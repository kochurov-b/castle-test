import { Schema, model, Document } from 'mongoose';

interface IReminder extends Document {
  title: string;
  date: Date;
  complete: boolean;
}

const schema: Schema<IReminder> = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

export const Reminder = model<IReminder>('Reminder', schema);
