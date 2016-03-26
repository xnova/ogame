import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import TechnologyType, { TechnologyMixin } from '../TechnologyType';
import BuildingType, { BuildingMixin } from '../BuildingType';

const CrystalStorageType = new ObjectType({
  name: 'CrystalStorage',
  interfaces: [TechnologyType, BuildingType],
  fields: {
    id: { type: new NonNull(ID) },
    ...TechnologyMixin,
    ...BuildingMixin,
    capacity: { type: IntType },
  },
  isTypeOf: (value) => true, // TODO
});

export default CrystalStorageType;
