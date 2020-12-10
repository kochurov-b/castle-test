import { GraphQLScalarType } from 'graphql';

import { dateScalar } from './helpers/scalars/scalars.date';

type TScalarsType = {
  Date: GraphQLScalarType;
};

export const scalarsTypes: TScalarsType = {
  Date: dateScalar,
};
