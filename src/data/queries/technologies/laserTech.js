import { LaserTechType } from '../../types/technologies';
import { Technology } from '../../models';

const laserTech = {
  type: LaserTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.LASER_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Laser Technology',
      description: 'Focusing light produces a beam that causes damage when it strikes an object.',
      longDescription: 'Lasers (light amplification by stimulated emission of radiation) produce ' +
      'an intense, energy rich emission of coherent light. ' +
      'These devices can be used in all sorts of areas, ' +
      'from optical computers to heavy laser weapons, ' +
      'which effortlessly cut through armour technology. ' +
      'The laser technology provides an important basis for research of other weapon technologies.',
    });
  },
};

export default laserTech;
