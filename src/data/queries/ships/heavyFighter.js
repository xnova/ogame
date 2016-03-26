import { HeavyFighterType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';

const heavyFighter = {
  type: HeavyFighterType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
      name: 'Light Fighter',
      description: 'LOREM IPSUM',
      longDescription: 'LOREM IPSUM',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ user }), level: 1 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 1 }, // TODO check
      ],
      structuralIntegrity: 0,
      shieldStrength: 0,
      attackStrength: 0,
      drive: combustionDrive.resolve({ player: planet.user }),
      speed: 0,
      cargoCapacity: 0,
      fuelUsage: 0,
    };
  },
};

export default heavyFighter;
