import { GraphQLID as ID } from 'graphql';
import PlanetType from '../types/PlanetType';

const planet = {
  type: PlanetType,
  args: {
    id: { type: ID },
  },
  resolve({ user }) {
    return {
      id: 123456987, // TODO
      player: user,
      name: 'Homeworld',
      diameter: 12800,
      fields: 163,
      coordinates: { // TODO
        galaxy: 1,
        system: 271,
        position: 12,
      },
    };
  },
};

export default planet;
