import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import DriveType from './DriveType';


const mixin = {
  drive: { type: DriveType },
  speed: { type: IntType },
  cargoCapacity: { type: new NonNull(IntType) },
  fuelUsage: { type: new NonNull(IntType) },
  // TODO rapidFireAgainst
};

const ShipInterface = new InterfaceType({
  name: 'Ship',
  fields: {
    ...mixin,
  },
});

export default ShipInterface;
export const ShipMixin = mixin;
