import GravitonTechType from '../types/GravitonTechType';

const gravitonTech = {
  type: GravitonTechType,
  resolve({ user }) {
    return {
      id: 222220, // TODO
      name: 'Graviton Technology',
      description: 'Firing a concentrated charge of graviton particles can create an ' +
      'artificial gravity field, which can destroy ships or even moons.',
      level: 2, // TODO
    };
  },
};

export default gravitonTech;
