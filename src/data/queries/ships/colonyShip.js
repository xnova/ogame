import { ColonyShipType } from '../../types/ships';
import { Ship } from '../../models';

const colonyShip = {
  type: ColonyShipType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.COLONY_SHIP_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Colony Ship',
      description: 'Vacant planets can be colonised with this ship.',
      longDescription: 'In the 20th Century, Man decided to go for the stars. ' +
      'First, it was landing on the Moon. ' +
      'After that, a space station was built. ' +
      'Mars was colonized soon afterwards. ' +
      'It was soon determined that our growth depended on colonizing other worlds. ' +
      'Scientists and engineers all over the world gathered together ' +
      'to develop mans greatest achievement ever. ' +
      'The Colony Ship is born. ' +
      '' + // TODO new paragraph
      'This ship is used to prepare a newly discovered planet for colonization. ' +
      'Once it arrives at the destination, ' +
      'the ship is instantly transformed into habitual living space to assist in ' +
      'populating and mining the new world. ' +
      'The maximum number of planets is thereby determined by ' +
      'the progress in astrophysics research. ' +
      'Two new levels of Astrotechnology allow for the colonization of one additional planet.',
      // TODO wtf is Astrotechnology?
    });    
  },
};

export default colonyShip;
