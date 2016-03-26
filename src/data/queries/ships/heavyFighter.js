import { HeavyFighterType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import impulseDrive from '../technologies/impulseDrive';
import armourTech from '../technologies/armourTech';

const heavyFighter = {
  type: HeavyFighterType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Heavy Fighter',
      description: 'This fighter is better armoured and ' +
      'has a higher attack strength than the light fighter.',
      longDescription: 'In developing the heavy fighter, ' +
      'researchers reached a point at which conventional drives ' +
      'no longer provided sufficient performance. ' +
      'In order to move the ship optimally, the impulse drive was used for the first time. ' +
      'This increased the costs, but also opened new possibilities. ' +
      'By using this drive, there was more energy left for weapons and shields; ' +
      ' addition, high-quality materials were used for this new family of fighters. ' +
      'With these changes, ' +
      'the heavy fighter represents a new era in ship technology and ' +
      'is the basis for cruiser technology. ' +
      '' + // TODO new paragraph
      'Slightly larger than the light fighter, ' +
      'the heavy fighter has thicker hulls, providing more protection, and stronger weaponry.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 3 }, // TODO check
        { technology: impulseDrive.resolve({ user }), level: 2 }, // TODO check
        { technology: armourTech.resolve({ user }), level: 2 }, // TODO check
      ],
      structuralIntegrity: 10000,
      shieldStrength: 25,
      attackStrength: 150,
      drive: impulseDrive.resolve({ user }),
      speed: 10000,
      cargoCapacity: 100,
      fuelUsage: 75,
    };
  },
};

export default heavyFighter;
