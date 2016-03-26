import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const ShipyardType = new ObjectType({
  name: 'Shipyard',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    shipyardSpeedFactor: { type: FloatType },
  },
  isTypeOf: (value) => true, // TODO
});

export default ShipyardType;
