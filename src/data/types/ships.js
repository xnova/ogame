import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from './UnitType';
import ShipInterface, { ShipMixin } from './ShipInterface';

class Ship extends ObjectType {
  constructor(name) {
    super({
      name,
      interfaces: [UnitType, ShipInterface],
      fields: {
        id: { type: new NonNull(ID) },
        ...UnitMixin,
        ...ShipMixin,
      },
      isTypeOf: (value) => true, // TODO
    });
  }
}

export const ShipType = new Ship('ShipType'); // TODO rename

// TODO SolarSatelliteType is special, can produce
export const SolarSatelliteType = new Ship('SolarSatellite');
