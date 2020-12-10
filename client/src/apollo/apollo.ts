import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { config } from '../config/config';

const link = createHttpLink({
  uri: config.apolloUri,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
