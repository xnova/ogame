import { RecyclerType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';
import shieldingTech from '../technologies/shieldingTech';

const recycler = {
  type: RecyclerType,
  resolve({ planet }) {
    const amount = 999; // TODO
    let drive = null;
    if (planet.hyperspaceDrive.level >= 15) {
      drive = planet.hyperspaceDrive;
    } else if (planet.impulseDrive.level >= 17) {
      drive = planet.impulseDrive;
    } else {
      drive = planet.combustionDrive;
    }
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Recycler',
      description: 'Recyclers are the only ships able to ' +
      'harvest debris fields floating in a planet\'s orbit after combat.',
      longDescription: 'Space battles became ever larger, ' +
      'ever fiercer, with thousands of ships being destroyed, ' +
      'the resources in the wreckage seemingly lost forever in giant debris fields. ' +
      'Normal cargo ships couldn\'t get close enough to these fields without ' +
      'risking substantial damage. ' +
      'Following the development of new shield technologies, ' +
      'it became possible to build a new class of ship capable of dealing with this problem: ' +
      'the Recycler was born. ' +
      'These new workhorses were able to gather up the resources so long believed lost, ' +
      'and allow them to be recycled. ' +
      'Thanks to their new shields, the wreckage no longer presented a danger, ' +
      'but the size of the generators reduced the size of the ship\'s hold such that ' +
      'each Recycler is limited to a capacity of 20,000. ' +
      '' + // TODO new paragraph
      'As soon as Impulse Drive research has reached level 17, ' +
      'Recyclers are refitted with Impulse Drives. ' +
      'As soon as Hyperspace Drive research has reached level 15, ' +
      'Recyclers are refitted with Hyperspace Drives.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 4 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 6 }, // TODO check
        { technology: shieldingTech.resolve({ user }), level: 2 }, // TODO check
      ],
      structuralIntegrity: 16000,
      shieldStrength: 10,
      attackStrength: 1,
      drive,
      speed: 2000,
      cargoCapacity: 20000,
      fuelUsage: 300,
    };
  },
};

export default recycler;
