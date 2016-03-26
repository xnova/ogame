import { FusionReactorType } from '../../types/buildings';
import deuteriumSynthesizer from './deuteriumSynthesizer';
import energyTech from '../technologies/energyTech';

const fusionReactor = {
  type: FusionReactorType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Fusion Reactor',
      description: 'The fusion reactor uses deuterium to produce energy.',
      longDescription: 'In fusion power plants, ' +
      'hydrogen nuclei are fused into helium nuclei under enormous temperature and pressure, ' +
      'releasing tremendous amounts of energy. ' +
      'For each gram of Deuterium consumed, up to 41,32*10^-13 Joule of energy can be produced; ' +
      'with 1 g you are able to produce 172 MWh energy.' +
      '' + // TODO new paragraph
      'Larger reactor complexes use more deuterium and can produce more energy per hour. ' +
      'The energy effect could be increased by researching energy technology. ' +
      '' + // TODO new paragraph
      'The energy production of the fusion plant is calculated like that: ' + // TODO newline
      '30 * [Level Fusion Plant] * ' +
      '(1,05 + [Level Energy Technology] * 0,01) ^ [Level Fusion Plant]',
      level,
      duration: 123,
      requirements: [
        { technology: deuteriumSynthesizer.resolve({ planet }), level: 5 }, // TODO check
        { technology: energyTech.resolve({ player: planet.user }), level: 3 }, // TODO check
      ],
      applications: [],
      canDismantle: true,
    };
  },
};

export default fusionReactor;
