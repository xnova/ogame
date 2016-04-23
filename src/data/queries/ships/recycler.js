import { RecyclerType } from '../../types/ships';
import { Ship } from '../../models';

const recycler = {
  type: RecyclerType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.RECYCLER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Recycler',
      description: 'Recyclers are the only ships able to ' +
      'harvest debris fields floating in a planet\'s orbit after combat.',
      longDescription: 'Space battles became ever larger, ' +
      'ever fiercer, with thousands of ships being destroyed, ' +
      'the resources in the wreckage seemingly lost forever in giant debris fields. ' +
      'Normal cargo ships couldn\'t get close enough to these fields without ' +
      'risking substantial damage. ' +
      'Following the development of new shield technologies, ' +
      'it became possible to build a new class of ship capable of dealing with this problem: ' +
      'the Recycler was born. ' +
      'These new workhorses were able to gather up the resources so long believed lost, ' +
      'and allow them to be recycled. ' +
      'Thanks to their new shields, the wreckage no longer presented a danger, ' +
      'but the size of the generators reduced the size of the ship\'s hold such that ' +
      'each Recycler is limited to a capacity of 20,000. ' +
      '' + // TODO new paragraph
      'As soon as Impulse Drive research has reached level 17, ' +
      'Recyclers are refitted with Impulse Drives. ' +
      'As soon as Hyperspace Drive research has reached level 15, ' +
      'Recyclers are refitted with Hyperspace Drives.',
    });
  },
};

export default recycler;
