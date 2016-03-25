import { GraphQLList as List } from 'graphql';
import PlanetType from '../types/PlanetType';

const planets = {
  type: new List(PlanetType),
  resolve({ user }) {
    return [{
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
    }, {
      id: 123456988, // TODO
      player: user,
      name: 'Colony',
      diameter: 25321,
      fields: 283,
      coordinates: { // TODO
        galaxy: 5,
        system: 463,
        position: 7,
      },
    }];
  },
};

export default planets;
