import {
  GraphQLList as ListType,
} from 'graphql';

import {
  ShipType,
  SolarSatelliteType,
} from '../types/ships';
import { Ship } from '../models';


class ShipQuery {
  constructor({ type, techId, name, description, longDescription }) {
    return {
      type,
      async resolve({ id: PlanetId }) {
        const where = { PlanetId, techId };
        let ship = await Ship.findOne({ where });
        if (!ship) {
          ship = Ship.build(where);
        }
        return Object.assign(ship, { name, description, longDescription });
      },
    };
  }
}

const solarSatellite = new ShipQuery({
  type: SolarSatelliteType,
  techId: Ship.SOLAR_SATELLITE_ID,
});

const KEY_MAP = new Map([
  ['smallCargo', Ship.SMALL_CARGO_ID],
  ['largeCargo', Ship.LARGE_CARGO_ID],
  ['lightFighter', Ship.LIGHT_FIGHTER_ID],
  ['heavyFighter', Ship.HEAVY_FIGHTER_ID],
  ['cruiser', Ship.CRUISER_ID],
  ['battleship', Ship.BATTLESHIP_ID],
  ['colonyShip', Ship.COLONY_SHIP_ID],
  ['recycler', Ship.RECYCLER_ID],
  ['espionageProbe', Ship.ESPIONAGE_PROBE_ID],
  ['bomber', Ship.BOMBER_ID],
  ['solarSatellite', Ship.SOLAR_SATELLITE_ID],
  ['destroyer', Ship.DESTROYER_ID],
  ['deathStar', Ship.DEATH_STAR_ID],
  ['battleCruiser', Ship.BATTLE_CRUISER_ID],
]);

const ships = {
  type: new ListType(ShipType),
  async resolve({ id: PlanetId }) {
    let where = { PlanetId };
    const planetShips = await Ship.findAll({ where }); // TODO
    let shipsList = [];
    for (let techId of KEY_MAP.values()) {
      where = { PlanetId, techId };
      shipsList.push(Ship.build(where));
    }
    return shipsList;
  },
};

const ship = {
  type: ShipType,
  resolve({ id: PlanetId }) {
    return null; // TODO
  },
};


export default {
  ships,
  ship,
  solarSatellite,
};
