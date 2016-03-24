import AstrophysicsType from '../types/AstrophysicsType';

const astrophysics = {
  type: AstrophysicsType,
  resolve({ user }) {
    return {
      id: 8520, // TODO
      name: 'Astrophysics',
      description: 'With an astrophysics research module, ships can undertake long expeditions. ' +
      'Every second level of this technology will allow you to colonise an extra planet.',
      level: 2, // TODO
    };
  },
};

export default astrophysics;
