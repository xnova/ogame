import { DeuteriumSynthesizerType } from '../../types/buildings';

const deuteriumSynthesizer = {
  type: DeuteriumSynthesizerType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Deuterium Synthesizer',
      description: 'Deuterium Synthesizers draw the trace Deuterium content ' +
      'from the water on a planet.',
      longDescription: 'Deuterium is also called heavy hydrogen. ' +
      'It is a stable isotope of hydrogen with a natural abundance in the oceans of colonies ' +
      'of approximately one atom in 6500 of hydrogen (~154 PPM). ' +
      'Deuterium thus accounts for approximately 0.015% (on a weight basis, 0.030%) of all. ' +
      'Deuterium is processed by special synthesizers which can separate ' +
      'the water from the Deuterium using specially designed centrifuges. ' +
      'The upgrade of the synthesizer allows for increasing ' +
      'the amount of Deuterium deposits processed. ' +
      'Deuterium is used when carrying out sensor phalanx scans, viewing galaxies, ' +
      'as fuel for ships, and performing specialized research upgrades.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default deuteriumSynthesizer;
