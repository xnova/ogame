import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UnitType, { UnitMixin } from '../UnitType';
import ShipType, { ShipMixin } from '../ShipType';

const Ship = (name) => new ObjectType({
  name: name,
  interfaces: [UnitType, ShipType],
  fields: {
    id: { type: new NonNull(ID) },
    ...UnitMixin,
    ...ShipMixin,
  },
  isTypeOf: (value) => true, // TODO
});

export const BattleCruiserType = Ship('BattleCruiser');
export const BattleshipType = Ship('Battleship');
export const BomberType = Ship('Bomber');
export const ColonyShipType = Ship('ColonyShip');
export const CruiserType = Ship('Cruiser');
export const DeathStarType = Ship('DeathStar');
export const DestroyerType = Ship('Destroyer');
export const EspionageProbeType = Ship('EspionageProbe');
export const HeavyFighterType = Ship('HeavyFighter');
export const LargeCargoType = Ship('LargeCargo');
export const LightFighterType = Ship('LightFighter');
export const RecyclerType = Ship('Recycler');
export const SmallCargoType = Ship('SmallCargo');
export const SolarSatelliteType = require('./SolarSatelliteType').default; // TODO is special, can produce
