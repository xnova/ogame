import { IntergalacticResearchNetworkType } from '../../types/technologies';
import computerTech from './computerTech';
import hyperspaceTech from './hyperspaceTech';

// TODO specialized data?

const intergalacticResearchNetwork = {
  type: IntergalacticResearchNetworkType,
  resolve({ user }) {
    return {
      id: 20005, // TODO
      name: 'Intergalactic Research Network',
      description: 'Researchers on different planets communicate via this network.',
      longDescription: 'This is your deep space network to communicate research results to ' +
      'your colonies. ' +
      'With the IRN, ' +
      'faster research times can be achieved by linking the highest level research labs equal ' +
      'to the level of the IRN developed. ' +
      '' + // TODO check new paragraph
      'In order to function, each colony must be able to conduct the research independently.',
      level: 25, // TODO
      requirements: [
        { technology: 'lab', level: 10 }, // TODO research lab
        { technology: computerTech.resolve({ user }), level: 8 }, // TODO check
        { technology: hyperspaceTech.resolve({ user }), level: 8 }, // TODO check
      ],
    };
  },
};

export default intergalacticResearchNetwork;
