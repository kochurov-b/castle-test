import express, { Express } from 'express';
import 'graphql-import-node';

import { config } from './config/config';
import { apolloSerer } from './graphql/graphql';
import { connectMongoose } from './helpers/connectMongoose.helper';

const app: Express = express();
apolloSerer.applyMiddleware({ app });

const startServer = (): void => {
  const { port, mongoUri } = config;
  const { graphqlPath } = apolloSerer;

  app.listen(port, () => {
    console.log(`Server running on port ${port}${graphqlPath}`);
    console.log(`Our database ${mongoUri}`);
  });
};

connectMongoose()
  .on('error', console.error)
  .on('disconnected', connectMongoose)
  .on('open', startServer);
