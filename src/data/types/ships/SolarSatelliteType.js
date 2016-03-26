import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from '../UnitType';
import ShipType, { ShipMixin } from '../ShipType';

const SolarSatelliteType = new ObjectType({
  name: 'SolarSatellite',
  interfaces: [UnitType, ShipType],
  fields: {
    id: { type: new NonNull(ID) },
    ...UnitMixin,
    ...ShipMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export default SolarSatelliteType;
