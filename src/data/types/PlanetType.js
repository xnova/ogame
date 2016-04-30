import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CoordinatesType from './CoordinatesType';
import buildings from '../queries/buildings';
import ships from '../queries/planet.ships';
import defenses from '../queries/planet.defenses';

const PlanetType = new ObjectType({
  name: 'Planet',
  fields: () => ({
    id: { type: new NonNull(ID) },
    player: { type: require('./UserType').default }, // TODO chapuza?
    name: { type: StringType },
    diameter: { type: IntType },
    fields: { type: IntType },
    coordinates: { type: new NonNull(CoordinatesType) },
    productionFactor: { type: FloatType }, // 0.00 to 1.00
    ...buildings,
    ...ships,
    ...defenses,
  }),
});

export default PlanetType;
