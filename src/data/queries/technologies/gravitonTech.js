import { GravitonTechType } from '../../types/technologies';
import researchLab from '../buildings/researchLab';

const gravitonTech = {
  type: GravitonTechType,
  resolve({ user }) {
    const planet = null; // TODO
    return {
      id: 222220, // TODO
      name: 'Graviton Technology',
      description: 'Firing a concentrated charge of graviton particles can create an ' +
      'artificial gravity field, which can destroy ships or even moons.',
      longDescription: 'A graviton is an elementary particle that is massless and has no cargo. ' +
      'It determines the gravitational power. ' +
      'By firing a concentrated load of gravitons, ' +
      'an artificial gravitational field can be constructed. ' +
      'Not unlike a black hole, it draws mass into itself. ' +
      'Thus it can destroy ships and even entire moons. ' +
      'To produce a sufficient amount of gravitons, huge amounts of energy are required.',
      level: 2, // TODO
      requirements: [
        { technology: researchLab.resolve({ planet }), level: 12 }, // TODO research lab
      ],
    };
  },
};

export default gravitonTech;
