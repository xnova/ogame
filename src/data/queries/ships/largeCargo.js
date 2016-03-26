import { LargeCargoType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';

const largeCargo = {
  type: LargeCargoType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Large Cargo',
      description: 'This cargo ship has a much larger cargo capacity than the small cargo, ' +
      'and is generally faster thanks to an improved drive.',
      longDescription: 'As time evolved, ' +
      'the raids on colonies resulted in larger and larger amounts of resources being captured. ' +
      'As a result, ' +
      'Small Cargos were being sent out in mass numbers to compensate for the larger captures. ' +
      'It was quickly learned that a new class of ship was needed to ' +
      'maximize resources captured in raids, ' +
      'yet also be cost effective. ' +
      'After much development, the Large Cargo was born. ' +
      '' + // TODO new paragraph
      'To maximize the resources that can be stored in the holds, ' +
      'this ship has little in the way of weapons or armor. ' +
      'Thanks to the highly developed combustion engine installed, ' +
      'it serves as the most economical resource supplier between planets, ' +
      'and most effective in raids on hostile worlds.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 4 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 6 }, // TODO check
      ],
      structuralIntegrity: 12000,
      shieldStrength: 25,
      attackStrength: 5,
      drive: combustionDrive.resolve({ user }),
      speed: 7500,
      cargoCapacity: 25000,
      fuelUsage: 50,
    };
  },
};

export default largeCargo;
