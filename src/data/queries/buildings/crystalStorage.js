import { CrystalStorageType } from '../../types/buildings';

const crystalStorage = {
  type: CrystalStorageType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Crystal Storage',
      description: 'Provides storage for excess crystal.',
      longDescription: 'Raw crystal is stored in this building. ' +
      'With each level of upgrade, it increases the amount of crystal can be stored. ' +
      'Once the mines output exceeds the storage capacity, the crystal mines automatically shut down to prevent a collapse in the mines.',
      level,
      duration: 308,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default crystalStorage;
