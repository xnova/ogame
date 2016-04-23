import { AstrophysicsType } from '../../types/technologies';
import { Technology } from '../../models';

const astrophysics = {
  type: AstrophysicsType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.ASTROPHYSICS_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Astrophysics',
      description: 'With an astrophysics research module, ships can undertake long expeditions. ' +
      'Every second level of this technology will allow you to colonise an extra planet.',
      longDescription: 'Further findings in the field of astrophysics allow for the construction ' +
      'of laboratories that can be fitted on more and more ships. ' +
      'This makes long expeditions far into unexplored areas of space possible. ' +
      'In addition these advancements can be used to further colonise the universe. ' +
      'For every two levels of this technology an additional planet can be made usable.',
    });
  },
};

export default astrophysics;
