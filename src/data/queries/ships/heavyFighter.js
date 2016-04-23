import { HeavyFighterType } from '../../types/ships';
import { Ship } from '../../models';

const heavyFighter = {
  type: HeavyFighterType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.HEAVY_FIGHTER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Heavy Fighter',
      description: 'This fighter is better armoured and ' +
      'has a higher attack strength than the light fighter.',
      longDescription: 'In developing the heavy fighter, ' +
      'researchers reached a point at which conventional drives ' +
      'no longer provided sufficient performance. ' +
      'In order to move the ship optimally, the impulse drive was used for the first time. ' +
      'This increased the costs, but also opened new possibilities. ' +
      'By using this drive, there was more energy left for weapons and shields; ' +
      ' addition, high-quality materials were used for this new family of fighters. ' +
      'With these changes, ' +
      'the heavy fighter represents a new era in ship technology and ' +
      'is the basis for cruiser technology. ' +
      '' + // TODO new paragraph
      'Slightly larger than the light fighter, ' +
      'the heavy fighter has thicker hulls, providing more protection, and stronger weaponry.',
    });
  },
};

export default heavyFighter;
