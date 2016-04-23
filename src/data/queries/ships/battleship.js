import { BattleshipType } from '../../types/ships';
import { Ship } from '../../models';

const battleship = {
  type: BattleshipType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.BATTLESHIP_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Battleship',
      description: 'Battleships form the backbone of a fleet. ' +
      'Their heavy cannons, ' +
      'high speed, and large cargo holds make them opponents to be taken seriously.',
      longDescription: 'Once it became apparent that the cruiser was losing ground ' +
      'to the increasing number of defence structures it was facing, ' +
      'and with the loss of ships on missions at unacceptable levels, ' +
      'it was decided to build a ship that could face those same type ' +
      'of defence structures with as little loss as possible. ' +
      'After extensive development, the Battleship was born. ' +
      'Built to withstand the largest of battles, the Battleship features large cargo spaces, ' +
      'heavy cannons, and high hyperdrive speed. ' +
      'Once developed, ' +
      'it eventually turned out to be the backbone of every raiding Emperors fleet.',
    });
  },
};

export default battleship;
