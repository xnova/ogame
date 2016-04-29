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

export const BattleCruiserType = new Ship('BattleCruiser');
export const BattleshipType = new Ship('Battleship');
export const BomberType = new Ship('Bomber');
export const ColonyShipType = new Ship('ColonyShip');
export const CruiserType = new Ship('Cruiser');
export const DeathStarType = new Ship('DeathStar');
export const DestroyerType = new Ship('Destroyer');
export const EspionageProbeType = new Ship('EspionageProbe');
export const HeavyFighterType = new Ship('HeavyFighter');
export const LargeCargoType = new Ship('LargeCargo');
export const LightFighterType = new Ship('LightFighter');
export const RecyclerType = new Ship('Recycler');
export const SmallCargoType = new Ship('SmallCargo');
// TODO SolarSatelliteType is special, can produce
export const SolarSatelliteType = new Ship('SolarSatellite');
