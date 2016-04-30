import {
  GraphQLList as ListType,
} from 'graphql';

import { DefenseType } from '../types/defenses';
import { Defense } from '../models';


const KEY_MAP = new Map([
  ['rocketLauncher', Defense.ROCKET_LAUNCHER_ID],
  ['lightLaser', Defense.LIGHT_LASER_ID],
  ['heavyLaser', Defense.HEAVY_LASER_ID],
  ['gaussCannon', Defense.GAUSS_CANNON_ID],
  ['ionCannon', Defense.ION_CANNON_ID],
  ['plasmaTurret', Defense.PLASMA_TURRET_ID],
  ['smallShieldDome', Defense.SMALL_SHIELD_DOME_ID],
  ['largeShieldDome', Defense.LARGE_SHIELD_DOME_ID],
]);

const defenses = {
  type: new ListType(DefenseType),
  async resolve({ id: PlanetId }) {
    let where = { PlanetId };
    const planetDefenses = await Defense.findAll({ where }); // TODO
    let defensesList = [];
    for (let techId of KEY_MAP.values()) {
      where = { PlanetId, techId };
      defensesList.push(Defense.build(where));
    }
    return defensesList;
  },
};

const defense = {
  type: DefenseType,
  resolve({ id: PlanetId }) {
    return null; // TODO
  },
};


export default {
  defenses,
  defense,
};
