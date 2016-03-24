import ImpulseDriveType from '../types/ImpulseDriveType';

const impulseDrive = {
  type: ImpulseDriveType,
  resolve({ user }) {
    return {
      id: 99, // TODO
      name: 'Impulse Drive',
      description: 'The impulse drive is based on the reaction principle. ' +
      'Further development of this drive makes some ships faster, ' +
      'although each level increases speed by only 20% of the base value.',
      level: 20, // TODO
    };
  },
};

export default impulseDrive;
