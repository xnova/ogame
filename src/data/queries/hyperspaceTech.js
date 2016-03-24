import HyperspaceTechType from '../types/HyperspaceTechType';

const hyperspaceTech = {
  type: HyperspaceTechType,
  resolve({ user }) {
    return {
      id: 10002, // TODO
      name: 'Hyperspace Technology',
      description: 'By integrating the 4th and 5th dimensions it is now possible ' +
      'to research a new kind of drive that is more economical and efficient.',
      level: 12, // TODO
    };
  },
};

export default hyperspaceTech;
