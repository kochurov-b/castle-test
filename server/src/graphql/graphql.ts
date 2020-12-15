import { ApolloServer } from 'apollo-server-express';

import { resolvers } from './graphql.resolvers';
import typeDefs from './graphql.types.graphql';

export const apolloSerer = new ApolloServer({
  typeDefs,
  resolvers,
});
