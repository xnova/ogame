import { BattleshipType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import hyperspaceDrive from '../technologies/hyperspaceDrive';

const battleship = {
  type: BattleshipType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 7 }, // TODO check
        { technology: hyperspaceDrive.resolve({ player: planet.user }), level: 4 }, // TODO check
      ],
      structuralIntegrity: 60000,
      shieldStrength: 200,
      attackStrength: 1000,
      drive: hyperspaceDrive.resolve({ player: planet.user }),
      speed: 10000,
      cargoCapacity: 1500,
      fuelUsage: 500,
    };
  },
};

export default battleship;
