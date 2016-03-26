import { MetalStorageType } from '../../types/buildings';

const metalStorage = {
  type: MetalStorageType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Metal Storage',
      description: 'Provides storage for excess metal.',
      longDescription: 'This storage facility is used to store metal ore. ' +
      'Each level of upgrading increases the amount of metal ore that can be stored. ' +
      'If the storage capacity is exceeded, ' +
      'the metal mines are automatically shut down to prevent a catastrophic collapse in the metal mine shafts.',
      level,
      duration: 205,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default metalStorage;
