import mongoose, { Connection } from 'mongoose';

import { config } from '../config/config';

const OPTIONS: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

type Options = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

export const connectMongoose = (): Connection => {
  const { mongoUri } = config;

  mongoose.connect(mongoUri, OPTIONS);

  return mongoose.connection;
};
