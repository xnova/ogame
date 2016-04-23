import { IntergalacticResearchNetworkType } from '../../types/technologies';
import { Technology } from '../../models';

// TODO specialized data?

const intergalacticResearchNetwork = {
  type: IntergalacticResearchNetworkType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.INTERGALACTIC_RESEARCH_NETWORK_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Intergalactic Research Network',
      description: 'Researchers on different planets communicate via this network.',
      longDescription: 'This is your deep space network to communicate research results to ' +
      'your colonies. ' +
      'With the IRN, ' +
      'faster research times can be achieved by linking the highest level research labs equal ' +
      'to the level of the IRN developed. ' +
      '' + // TODO check new paragraph
      'In order to function, each colony must be able to conduct the research independently.',
    });
  },
};

export default intergalacticResearchNetwork;
