import { HeavyLaserType } from '../../types/defenses';
import shipyard from '../buildings/shipyard';
import energyTech from '../technologies/energyTech';
import laserTech from '../technologies/laserTech';

const heavyLaser = {
  type: HeavyLaserType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Heavy Laser',
      description: 'The heavy laser is the logical development of the light laser.',
      longDescription: 'The Heavy Laser is a practical, improved version of the Light Laser. ' +
      'Being more balanced than the Light Laser with improved alloy composition, ' +
      'it utilizes stronger, ' +
      'more densely packed beams, and even better onboard targeting systems. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 4 }, // TODO check
        { technology: energyTech.resolve({ user }), level: 3 }, // TODO check
        { technology: laserTech.resolve({ user }), level: 6 }, // TODO check
      ],
      structuralIntegrity: 8000,
      shieldStrength: 100,
      attackStrength: 250,
    };
  },
};

export default heavyLaser;
