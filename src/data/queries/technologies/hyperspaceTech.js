import HyperspaceTechType from '../../types/technologies/HyperspaceTechType';
import shieldingTech from './shieldingTech';
import energyTech from './energyTech';

const hyperspaceTech = {
  type: HyperspaceTechType,
  resolve({ user }) {
    return {
      id: 10002, // TODO
      name: 'Hyperspace Technology',
      description: 'By integrating the 4th and 5th dimensions it is now possible ' +
      'to research a new kind of drive that is more economical and efficient.',
      longDescription: 'In theory, the idea of hyperspace travel relies on the existence of ' +
      'a separate and adjacent dimension. ' +
      'When activated, a hyperspace drive shunts the starship into this other dimension, ' +
      'where it can cover vast distances in an amount of time greatly reduced from the time ' +
      'it would take in "normal" space. ' +
      'Once it reaches the point in hyperspace that corresponds to ' +
      'its destination in real space, it re-emerges. ' +
      '' + // TODO check newline?
      'Once a sufficient level of Hyperspace Technology is researched, ' +
      'the Hyperspace Drive is no longer just a theory.',
      level: 12, // TODO
      requirements: [
        { technology: 'lab', level: 7 }, // TODO research lab
        { technology: shieldingTech.resolve({ user }), level: 5 }, // TODO check
        { technology: energyTech.resolve({ user }), level: 5 }, // TODO check
      ],
    };
  },
};

export default hyperspaceTech;
