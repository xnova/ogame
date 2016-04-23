import { BomberType } from '../../types/ships';
import { Ship } from '../../models';

const bomber = {
  type: BomberType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.BOMBER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Bomber',
      description: 'The bomber was developed especially to ' +
      'destroy the planetary defences of a world.',
      longDescription: 'Over the centuries, ' +
      'as defences were starting to get larger and more sophisticated, ' +
      'fleets were starting to be destroyed at an alarming rate. ' +
      'It was decided that a new ship was needed to break defences to ensure maximum results. ' +
      'After years of research and development, the Bomber was created. ' +
      '' + // TODO check new paragraph
      'Using laser-guided targeting equipment and Plasma Bombs, ' +
      'the Bomber seeks out and destroys any defence mechanism it can find. ' +
      'As soon as the hyperspace drive is developed to Level 8, ' +
      'the Bomber is retrofitted with the hyperspace engine and can fly at higher speeds.',
    });
  },
};

export default bomber;
