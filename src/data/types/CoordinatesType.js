import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
} from 'graphql';

const CoordinatesType = new ObjectType({
  name: 'Coordinates',
  fields: {
    galaxy: { type: IntType },
    system: { type: IntType },
    position: { type: IntType },
  },
});

export default CoordinatesType;
