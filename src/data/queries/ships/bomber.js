import { BomberType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import impulseDrive from '../technologies/impulseDrive';
import hyperspaceDrive from '../technologies/hyperspaceDrive';
import plasmaTech from '../technologies/plasmaTech';

const bomber = {
  type: BomberType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Bomber',
      description: 'The bomber was developed especially to ' +
      'destroy the planetary defences of a world.',
      longDescription: 'Over the centuries, ' +
      'as defences were starting to get larger and more sophisticated, ' +
      'fleets were starting to be destroyed at an alarming rate. ' +
      'It was decided that a new ship was needed to break defences to ensure maximum results. ' +
      'After years of research and development, the Bomber was created. ' +
      '' + // TODO check new paragraph
      'Using laser-guided targeting equipment and Plasma Bombs, ' +
      'the Bomber seeks out and destroys any defence mechanism it can find. ' +
      'As soon as the hyperspace drive is developed to Level 8, ' +
      'the Bomber is retrofitted with the hyperspace engine and can fly at higher speeds.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 8 }, // TODO check
        { technology: impulseDrive.resolve({ user }), level: 6 }, // TODO check
        { technology: plasmaTech.resolve({ user }), level: 5 }, // TODO check
      ],
      structuralIntegrity: 7500,
      shieldStrength: 500,
      attackStrength: 1000,
      drive: planet.hyperspaceDrive.level < 8 ?
        impulseDrive.resolve({ user }) : hyperspaceDrive.resolve({ user }),
      speed: 4000,
      cargoCapacity: 500,
      fuelUsage: 1000,
    };
  },
};

export default bomber;
