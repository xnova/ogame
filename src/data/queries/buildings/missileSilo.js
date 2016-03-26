import { MissileSiloType } from '../../types/buildings';
import shipyard from './shipyard';

const missileSilo = {
  type: MissileSiloType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Missile Silo',
      description: 'Missile silos are used to store missiles.',
      longDescription: 'Missile silos are used to construct, ' +
      'store and launch interplanetary and anti-ballistic missiles. ' +
      'With each level of the silo, ' +
      'five interplanetary missiles or ten anti-ballistic missiles can be stored. ' +
      'Storage of both Interplanetary missiles and Anti-Ballistic missiles in the same silo is allowed.',
      level,
      duration: 123,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 1 }, // TODO check
      ],
      applications: [],
      canDismantle: true,
    };
  },
};

export default missileSilo;
