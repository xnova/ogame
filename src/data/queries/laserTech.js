import LaserTechType from '../types/LaserTechType';
import energyTech from './energyTech';

const laserTech = {
  type: LaserTechType,
  resolve({ user }) {
    return {
      id: 5, // TODO
      name: 'Laser Technology',
      description: 'Focusing light produces a beam that causes damage when it strikes an object.',
      longDescription: 'Lasers (light amplification by stimulated emission of radiation) produce ' +
      'an intense, energy rich emission of coherent light. ' +
      'These devices can be used in all sorts of areas, ' +
      'from optical computers to heavy laser weapons, ' +
      'which effortlessly cut through armour technology. ' +
      'The laser technology provides an important basis for research of other weapon technologies.',
      level: 6, // TODO
      requirements: [
        { technology: energyTech.resolve({ user }), level: 2 }, // TODO check
      ],
    };
  },
};

export default laserTech;
