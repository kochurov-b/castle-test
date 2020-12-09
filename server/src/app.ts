import express, { Express } from 'express';

import { config } from './config/config';
import { connectMongoose } from './helpers/connectMongoose.helper';

const app: Express = express();

const startServer = (): void => {
  const { port, mongoUri } = config;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Our database ${mongoUri}`);
  });
};

connectMongoose()
  .on('error', console.error)
  .on('disconnected', connectMongoose)
  .on('open', startServer);
