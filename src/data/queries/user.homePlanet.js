import { GraphQLNonNull as NonNull } from 'graphql';
import PlanetType from '../types/PlanetType';

const homePlanet = {
  type: new NonNull(PlanetType),
  resolve({ user }) {
    return {
      id: 1, // TODO
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

export default homePlanet;
