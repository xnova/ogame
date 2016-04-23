import { DeathStarType } from '../../types/ships';
import { Ship } from '../../models';

const deathStar = {
  type: DeathStarType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.DEATH_STAR_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
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
    });
  },
};

export default deathStar;
