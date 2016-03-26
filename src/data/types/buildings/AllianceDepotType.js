import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const AllianceDepotType = new ObjectType({
  name: 'AllianceDepot',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    holdingCapacity: { type: IntType }, // support-rocket that brings deuterium to the fleet in the orbit
  },
  isTypeOf: (value) => true, // TODO
});

export default AllianceDepotType;
