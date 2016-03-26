import { MetalMineType } from '../../types/buildings';

const metalMine = {
  type: MetalMineType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Metal Mine',
      description: 'Used in the extraction of metal ore, metal mines are of primary importance to all emerging and established empires.',
      longDescription: 'Metal is the primary resource used in the foundation of your Empire. ' +
      'At greater depths, the mines can produce more output of viable metal for use in the construction of buildings, ships, defence systems, and research. ' +
      'As the mines drill deeper, more energy is required for maximum production. ' +
      'As metal is the most abundant of all resources available, its value is considered to be the lowest of all resources for trading.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default metalMine;
