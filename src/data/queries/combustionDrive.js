import CombustionDriveType from '../types/CombustionDriveType';

const combustionDrive = {
  type: CombustionDriveType,
  resolve({ user }) {
    return {
      id: 999, // TODO
      name: 'Combustion Drive',
      description: 'The development of this drive makes some ships faster, ' +
      'although each level increases speed by only 10% of the base value.',
      level: 10, // TODO
    };
  },
};

export default combustionDrive;
