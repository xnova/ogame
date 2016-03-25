import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CoordinatesType from './CoordinatesType';

const PlanetType = new ObjectType({
  name: 'Planet',
  fields() {
    return {
      id: { type: new NonNull(ID) },
      player: { type: require('./UserType').default }, // TODO chapuza?
      name: { type: StringType },
      diameter: { type: IntType },
      fields: { type: IntType },
      coordinates: { type: new NonNull(CoordinatesType) },
    };
  },
});

export default PlanetType;
