import {
  GraphQLObjectType as ObjectType,
  GraphQLInterfaceType as InterfaceType,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

// http://stackoverflow.com/questions/32551022/how-do-i-create-a-graphql-schema-for-a-self-referencing-data-hierarchy
// TODO on another file?
const RequirementType = new ObjectType({
  name: 'Requirement',
  fields: () => ({
    technology: { type: TechnologyType },
    level: { type: IntType },
  }),
});

// TODO on another file?
const ApplicationType = new ObjectType({
  name: 'Application',
  fields: () => ({
    technology: { type: TechnologyType },
    level: { type: IntType },
  }),
});

const mixin = {
  name: { type: StringType },
  description: { type: StringType },
  longDescription: { type: StringType },
  level: { type: IntType },
  duration: { type: IntType }, // improve duration in seconds
  requirements: { type: new List(RequirementType) }, // TODO requirements
  applications: { type: new List(ApplicationType) }, // TODO requirements
};

const TechnologyType = new InterfaceType({
  name: 'Technology',
  fields: {
    ...mixin,
  },
});

export default TechnologyType;
export const TechnologyMixin = mixin;
