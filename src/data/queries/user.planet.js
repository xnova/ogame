import { GraphQLID as ID } from 'graphql';
import PlanetType from '../types/PlanetType';
import { Planet } from '../models';

const query = { // TODO better name
  type: PlanetType,
  args: {
    id: { type: ID },
  },
  async resolve({ request }, { id }) {
    const planet = await Planet.findById(id);
    // TODO filter by user
    if (!planet.name) {
      // TODO Colony, Abandoned planet...
      planet.name = 'Homeworld';
    }
    planet.coordinates = { // TODO c'mon! I can do it better!
      galaxy: planet.galaxy,
      system: planet.system,
      position: planet.position,
    };
    return planet; // TODO dangerous!
  },
};

export default query;
