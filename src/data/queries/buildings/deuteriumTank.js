import { DeuteriumTankType } from '../../types/buildings';

const deuteriumTank = {
  type: DeuteriumTankType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Deuterium Tank',
      description: 'Giant tanks for storing newly-extracted deuterium.',
      longDescription: 'The Deuterium tank is for storing newly-synthesized deuterium. ' +
      'Once it is processed by the synthesizer, it is piped into this tank for later use. ' +
      'With each upgrade of the tank, the total storage capacity is increased. ' +
      'Once the capacity is reached, the Deuterium Synthesizer is shut down to prevent the tanks rupture.',
      level,
      duration: 411,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default deuteriumTank;
