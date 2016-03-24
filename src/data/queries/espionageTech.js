import EspionageTechType from '../types/EspionageTechType';

const espionageTech = {
  type: EspionageTechType,
  resolve({ user }) {
    return {
      id: 78031, // TODO
      name: 'Espionage Technology',
      description: 'Information about other planets and moons can be gained using this technology.',
      level: 2, // TODO
    };
  },
};

export default espionageTech;
