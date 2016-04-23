import { IonTechType } from '../../types/technologies';
import { Technology } from '../../models';

// TODO specialized data? deconstruction costs?

const ionTech = {
  type: IonTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.ION_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Ion Technology',
      description: 'The concentration of ions allows for the construction of cannons, ' +
      'which can inflict enormous damage and reduce the deconstruction costs per level by 4%.',
      longDescription: 'Ions can be concentrated and accelerated into a deadly beam. ' +
      'These beams can then inflict enormous damage. ' +
      'Our scientists have also developed a technique that will clearly reduce ' +
      'the deconstruction costs for buildings and systems. ' +
      'For each research level, the deconstruction costs will sink by 4%.',
    });
  },
};

export default ionTech;
