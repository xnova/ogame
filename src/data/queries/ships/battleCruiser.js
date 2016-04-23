import { BattleCruiserType } from '../../types/ships';
import { Ship } from '../../models';

const battleCruiser = {
  type: BattleCruiserType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.BATTLE_CRUISER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Battlecruiser',
      description: 'The Battlecruiser is highly specialized in the interception of hostile fleets.',
      longDescription: 'This ship is one of the most advanced fighting ships ever ' +
      'to be developed, ' +
      'and is particularly deadly when it comes to destroying attacking fleets. ' +
      'With its improved laser cannons on board and advanced Hyperspace engine, ' +
      'the Battlecruiser is a serious force to be dealt with in any attack. ' +
      'Due to the ships design and its large weapons system, the cargo holds had to be cut, ' +
      'but this is compensated for by the lowered fuel consumption.',
    });
  },
};

export default battleCruiser;
