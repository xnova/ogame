import EnergyTechType from '../types/EnergyTechType';

const energyTech = {
  type: EnergyTechType,
  resolve({ user }) {
    return {
      id: 10001, // TODO
      name: 'Energy Technology',
      description: 'The command of different types of energy is necessary ' +
      'for many new technologies.',
      level: 13, // TODO
    };
  },
};

export default energyTech;
