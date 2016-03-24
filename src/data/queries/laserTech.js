import LaserTechType from '../types/LaserTechType';

const laserTech = {
  type: LaserTechType,
  resolve({ user }) {
    return {
      id: 5, // TODO
      name: 'Laser Technology',
      description: 'Focusing light produces a beam that causes damage when it strikes an object.',
      level: 6, // TODO
    };
  },
};

export default laserTech;
