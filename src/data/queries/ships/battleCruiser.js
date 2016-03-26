import { BattleCruiserType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import laserTech from '../technologies/laserTech';
import hyperspaceDrive from '../technologies/hyperspaceDrive';

const battleCruiser = {
  type: BattleCruiserType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
      name: 'Battlecruiser',
      description: 'The Battlecruiser is highly specialized in the interception of hostile fleets.',
      longDescription: 'This ship is one of the most advanced fighting ships ever ' +
      'to be developed, ' +
      'and is particularly deadly when it comes to destroying attacking fleets. ' +
      'With its improved laser cannons on board and advanced Hyperspace engine, ' +
      'the Battlecruiser is a serious force to be dealt with in any attack. ' +
      'Due to the ships design and its large weapons system, the cargo holds had to be cut, ' +
      'but this is compensated for by the lowered fuel consumption.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 8 }, // TODO check
        { technology: laserTech.resolve({ user: planet.user }), level: 1 }, // TODO check
        { technology: hyperspaceDrive.resolve({ user: planet.user }), level: 1 }, // TODO check
      ],
      structuralIntegrity: 70000,
      shieldStrength: 400,
      attackStrength: 700,
      drive: hyperspaceDrive.resolve({ player: planet.user }),
      speed: 10000,
      cargoCapacity: 750,
      fuelUsage: 250,
    };
  },
};

export default battleCruiser;
