import IntergalacticResearchNetworkType from '../types/IntergalacticResearchNetworkType';

const intergalacticResearchNetwork = {
  type: IntergalacticResearchNetworkType,
  resolve({ user }) {
    return {
      id: 20005, // TODO
      name: 'Intergalactic Research Network',
      description: 'Researchers on different planets communicate via this network.',
      level: 25, // TODO
    };
  },
};

export default intergalacticResearchNetwork;
