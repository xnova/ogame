import { SmallCargoType } from '../../types/ships';
import { Ship } from '../../models';

const smallCargo = {
  type: SmallCargoType,
  async resolve({ planet }) { // TODO
    const where = { PlanetId: 1, techId: Ship.SMALL_CARGO_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Small Cargo',
      description: 'The small cargo is an agile ship which ' +
      'can quickly transport resources to other planets.',
      longDescription: 'The first ship built by any emperor, ' +
      'the small cargo is an agile resource moving ship that ' +
      'has a cargo capacity of 5,000 resource units. ' +
      'This multi-use ship not only has the ability to ' +
      'quickly transport resources between your colonies, ' +
      'but also accompanies larger fleets on raiding missions on enemy targets. ' +
      '[Ship refitted with Impulse Drives once you reach level 5]',
    });
  },
};

export default smallCargo;
