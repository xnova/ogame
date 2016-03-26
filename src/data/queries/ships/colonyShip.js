import { ColonyShipType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import impulseDrive from '../technologies/impulseDrive';

const colonyShip = {
  type: ColonyShipType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 4 }, // TODO check
        { technology: impulseDrive.resolve({ user }), level: 3 }, // TODO check
      ],
      structuralIntegrity: 30000,
      shieldStrength: 100,
      attackStrength: 50,
      drive: impulseDrive.resolve({ user }),
      speed: 2500,
      cargoCapacity: 7500,
      fuelUsage: 1000,
    };
  },
};

export default colonyShip;
