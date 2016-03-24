import IonTechType from '../types/IonTechType';

const ionTech = {
  type: IonTechType,
  resolve({ user }) {
    return {
      id: 10003, // TODO
      name: 'Ion Technology',
      description: 'The concentration of ions allows for the construction of cannons, ' +
      'which can inflict enormous damage and reduce the deconstruction costs per level by 4%.',
      level: 6, // TODO
    };
  },
};

export default ionTech;
