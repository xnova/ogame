import IonTechType from '../types/IonTechType';

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
    };
  },
};

export default ionTech;
