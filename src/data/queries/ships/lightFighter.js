import { LightFighterType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';

const lightFighter = {
  type: LightFighterType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Light Fighter',
      description: 'This is the first fighting ship all emperors will build. ' +
      'The light fighter is an agile ship, but vulnerable on its own. ' +
      'In mass numbers, they can become a great threat to any empire. ' +
      'They are the first to accompany small and large cargoes to ' +
      'hostile planets with minor defences.',
      longDescription: 'This is the first fighting ship all emperors will build. ' +
      'The light fighter is an agile ship, but vulnerable when it is on its own. ' +
      'In mass numbers, they can become a great threat to any empire. ' +
      'They are the first to accompany small and large cargoes to ' +
      'hostile planets with minor defences.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 1 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 1 }, // TODO check
      ],
      structuralIntegrity: 4000,
      shieldStrength: 10,
      attackStrength: 50,
      drive: combustionDrive.resolve({ user }),
      speed: 12500,
      cargoCapacity: 50,
      fuelUsage: 20,
    };
  },
};

export default lightFighter;
