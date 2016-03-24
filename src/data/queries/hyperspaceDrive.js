import HyperspaceDriveType from '../types/HyperspaceDriveType';

const hyperspaceDrive = {
  type: HyperspaceDriveType,
  resolve({ user }) {
    return {
      id: 9, // TODO
      name: 'Hyperspace Drive',
      description: 'Hyperspace drive warps space around a ship. ' +
      'The development of this drive makes some ships faster, although each level ' +
      'increases speed by only 30% of the base value.',
      level: 13, // TODO
    };
  },
};

export default hyperspaceDrive;
