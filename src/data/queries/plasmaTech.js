import PlasmaTechType from '../types/PlasmaTechType';

// TODO specialized data? production factor? metalProductionFactor? crystalProductionFactor?

const plasmaTech = {
  type: PlasmaTechType,
  resolve({ user }) {
    return {
      id: 100067, // TODO
      name: 'Plasma Technology',
      description: 'A further development of ion technology ' +
      'which accelerates high-energy plasma, ' +
      'which then inflicts devastating damage and additionally optimises the production of ' +
      'metal and crystal (1%/0.66% per level).',
      longDescription: 'A further development of ion technology that doesn\'t speed up ions ' +
      'but high-energy plasma instead, ' +
      'which can then inflict devastating damage on impact with an object. ' +
      'Our scientists have also found a way to noticeably improve the mining of ' +
      'metal and crystal using this technology. ' +
      '' + // TODO check new paragraph
      'Metal production increases by 1% and crystal production by 0.66% ' +
      'per construction level of the plasma technology.',
      level: 2, // TODO
    };
  },
};

export default plasmaTech;
