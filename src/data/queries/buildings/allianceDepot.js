import { AllianceDepotType } from '../../types/buildings';

const armourTech = {
  type: AllianceDepotType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 1112, // TODO
      name: 'Alliance Depot',
      description: 'The alliance depot supplies fuel to friendly fleets in orbit helping with defence.',
      longDescription: 'The alliance depot supplies fuel to friendly fleets in orbit helping with defence. ' +
      'For each upgrade level of the alliance depot, ' +
      'a special demand of deuterium per hour can be sent to an orbiting fleet.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default armourTech;
