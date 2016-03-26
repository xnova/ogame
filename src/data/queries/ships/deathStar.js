import { DeathStarType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import hyperspaceDrive from '../technologies/hyperspaceDrive';
import gravitonTech from '../technologies/gravitonTech';
import hyperspaceTech from '../technologies/hyperspaceTech';

const deathStar = {
  type: DeathStarType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Death Star',
      description: 'The destructive power of the deathstar is unsurpassed.',
      longDescription: 'The Deathstar is the most powerful ship ever created. ' +
      'This moon sized ship is the only ship that can be seen with the naked eye on the ground. ' +
      'By the time you spot it, unfortunately, it is too late to do anything. ' +
      '' + // TODO new paragraph
      'Armed with a gigantic graviton cannon, ' +
      'the most advanced weapons system ever created in the Universe, ' +
      'this massive ship has not only the capability of destroying entire fleets and defences, ' +
      'but also has the capability of destroying entire moons. ' +
      'Only the most advanced empires have the capability to build a ship of this mammoth size.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 12 }, // TODO check
        { technology: hyperspaceDrive.resolve({ user }), level: 7 }, // TODO check
        { technology: gravitonTech.resolve({ user }), level: 1 }, // TODO check
        { technology: hyperspaceTech.resolve({ user }), level: 6 }, // TODO check
      ],
      structuralIntegrity: 9000000,
      shieldStrength: 50000,
      attackStrength: 200000,
      drive: hyperspaceDrive.resolve({ user }),
      speed: 100,
      cargoCapacity: 1000000,
      fuelUsage: 1,
    };
  },
};

export default deathStar;
