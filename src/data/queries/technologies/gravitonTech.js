import { GravitonTechType } from '../../types/technologies';
import { Technology } from '../../models';

const gravitonTech = {
  type: GravitonTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.GRAVITON_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
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
    });
  },
};

export default gravitonTech;
