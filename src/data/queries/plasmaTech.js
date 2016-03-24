import PlasmaTechType from '../types/PlasmaTechType';

const plasmaTech = {
  type: PlasmaTechType,
  resolve({ user }) {
    return {
      id: 100067, // TODO
      name: 'Plasma Technology',
      description: 'A further development of ion technology which accelerates high-energy plasma, ' +
      'which then inflicts devastating damage and additionally optimises the production of ' +
      'metal and crystal (1%/0.66% per level).',
      level: 2, // TODO
    };
  },
};

export default plasmaTech;
