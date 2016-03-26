import { CrystalMineType } from '../../types/buildings';

const crystalMine = {
  type: CrystalMineType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Crystal Mine',
      description: 'LOREM IPSUM',
      longDescription: 'LOREM IPSUM',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default crystalMine;
