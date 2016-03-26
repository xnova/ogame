import IonTechType from '../../types/technologies/IonTechType';
import laserTech from './laserTech';
import energyTech from './energyTech';

// TODO specialized data? deconstruction costs?

const ionTech = {
  type: IonTechType,
  resolve({ user }) {
    return {
      id: 10003, // TODO
      name: 'Ion Technology',
      description: 'The concentration of ions allows for the construction of cannons, ' +
      'which can inflict enormous damage and reduce the deconstruction costs per level by 4%.',
      longDescription: 'Ions can be concentrated and accelerated into a deadly beam. ' +
      'These beams can then inflict enormous damage. ' +
      'Our scientists have also developed a technique that will clearly reduce ' +
      'the deconstruction costs for buildings and systems. ' +
      'For each research level, the deconstruction costs will sink by 4%.',
      level: 6, // TODO
      requirements: [
        { technology: 'lab', level: 4 }, // TODO research lab
        { technology: laserTech.resolve({ user }), level: 5 }, // TODO check
        { technology: energyTech.resolve({ user }), level: 4 }, // TODO check
      ],
    };
  },
};

export default ionTech;
