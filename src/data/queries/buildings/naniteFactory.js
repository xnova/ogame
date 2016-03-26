import { NaniteFactoryType } from '../../types/buildings';
import roboticsFactory from './roboticsFactory';
import computerTech from '../technologies/computerTech';

const naniteFactory = {
  type: NaniteFactoryType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Nanite Factory',
      description: 'This is the ultimate in robotics technology. ' +
      'Each level cuts the construction time for buildings, ships, and defences.',
      longDescription: 'A nanomachine, also called a nanite, ' +
      'is a mechanical or electromechanical device whose dimensions are measured in nanometers ' +
      '(millionths of a millimeter, or units of 10^-9 meter). ' +
      'The microscopic size of nanomachines translates into higher operational speed. ' +
      'This factory produces nanomachines that are the ultimate evolution in robotics technology. ' +
      'Once constructed, each upgrade significantly decreases production time for buildings, ships, and defensive structures.',
      level,
      duration: 123,
      requirements: [
        { technology: roboticsFactory.resolve({ planet }), level: 10 }, // TODO check
        { technology: computerTech.resolve({ player: planet.user }), level: 10 }, // TODO check
      ],
      applications: [],
      canDismantle: true,
    };
  },
};

export default naniteFactory;
