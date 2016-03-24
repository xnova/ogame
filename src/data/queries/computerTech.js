import ComputerTechType from '../types/ComputerTechType';

const computerTech = {
  type: ComputerTechType,
  resolve({ user }) {
    return {
      id: 213, // TODO
      name: 'Computer Technology',
      description: 'More fleets can be commanded by increasing computer capacities. ' +
      'Each level of computer technology increases the maximum number of fleets by one.',
      level: 23, // TODO
    };
  },
};

export default computerTech;
