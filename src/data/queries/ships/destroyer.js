import { DestroyerType } from '../../types/ships';
import { Ship } from '../../models';

const destroyer = {
  type: DestroyerType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.DESTROYER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Destroyer',
      description: 'The destroyer is the king of the warships.',
      longDescription: 'The Destroyer is the result of years of work and development. ' +
      'With the development of Deathstars, ' +
      'it was decided that a class of ship was needed to defend against such a massive weapon. ' +
      'Thanks to its improved homing sensors, ' +
      'multi-phalanx Ion cannons, Gauss Cannons and Plasma Turrets, ' +
      'the Destroyer turned out to be one of the most fearsome ships created. ' +
      '' + // TODO new paragraph
      'Because the destroyer is very large, its manoeuvrability is severely limited, ' +
      'which makes it more of a battle station than a fighting ship. ' +
      'The lack of manoeuvrability is made up for by its sheer firepower, ' +
      'but it also costs significant amounts of deuterium to build and operate.',
    });
  },
};

export default destroyer;
