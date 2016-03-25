import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const TechnologyMixin = {
  name: { type: StringType },
  description: { type: StringType },
  longDescription: { type: StringType },
  level: { type: IntType },
};

export default TechnologyMixin;
