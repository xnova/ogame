import { SolarPlantType } from '../../types/buildings';

const solarPlant = {
  type: SolarPlantType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Solar Plant',
      description: 'Solar power plants absorb energy from solar radiation. ' +
      'All mines need energy to operate.',
      longDescription: 'Gigantic solar arrays are used to generate power for the mines and the deuterium synthesizer. ' +
      'As the solar plant is upgraded, ' +
      'the surface area of the photovoltaic cells covering the planet increases, ' +
      'resulting in a higher energy output across the power grids of your planet.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default solarPlant;
