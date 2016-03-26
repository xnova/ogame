import { SmallCargoType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';
import impulseDrive from '../technologies/impulseDrive';

const smallCargo = {
  type: SmallCargoType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Small Cargo',
      description: 'The small cargo is an agile ship which ' +
      'can quickly transport resources to other planets.',
      longDescription: 'The first ship built by any emperor, ' +
      'the small cargo is an agile resource moving ship that ' +
      'has a cargo capacity of 5,000 resource units. ' +
      'This multi-use ship not only has the ability to ' +
      'quickly transport resources between your colonies, ' +
      'but also accompanies larger fleets on raiding missions on enemy targets. ' +
      '[Ship refitted with Impulse Drives once you reach level 5]',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 2 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 2 }, // TODO check
      ],
      structuralIntegrity: 4000,
      shieldStrength: 10,
      attackStrength: 5,
      drive: planet.impulseDrive.level < 5 ?
        combustionDrive.resolve({ user }) : impulseDrive.resolve({ user }),
      speed: 5000,
      cargoCapacity: 5000,
      fuelUsage: 10,
    };
  },
};

export default smallCargo;
