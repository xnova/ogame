import EnergyTechType from '../types/EnergyTechType';

// TODO maybe specialized data like efficiency?

const energyTech = {
  type: EnergyTechType,
  resolve({ user }) {
    return {
      id: 10001, // TODO
      name: 'Energy Technology',
      description: 'The command of different types of energy is necessary ' +
      'for many new technologies.',
      longDescription: 'As various fields of research advanced, ' +
      'it was discovered that the current technology of energy distribution was not sufficient ' +
      'enough to begin certain specialized research. ' +
      'With each upgrade of your Energy Technology, ' +
      'new research can be conducted which unlocks development of ' +
      'more sophisticated ships and defences.',
      level: 13, // TODO
    };
  },
};

export default energyTech;
