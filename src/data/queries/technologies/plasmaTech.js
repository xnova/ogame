import { PlasmaTechType } from '../../types/technologies';
import { Technology } from '../../models';

// TODO specialized data? production factor? metalProductionFactor? crystalProductionFactor?

const plasmaTech = {
  type: PlasmaTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.PLASMA_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
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
    });
  },
};

export default plasmaTech;
