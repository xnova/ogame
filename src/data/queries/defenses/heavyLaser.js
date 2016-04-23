import { HeavyLaserType } from '../../types/defenses';
import { Defense } from '../../models';

const heavyLaser = {
  type: HeavyLaserType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Defense.HEAVY_LASER_ID };
    let defense = await Defense.findOne({ where });
    if (!defense) {
      defense = Defense.build(where);
    }
    return Object.assign(defense, {
      name: 'Heavy Laser',
      description: 'The heavy laser is the logical development of the light laser.',
      longDescription: 'The Heavy Laser is a practical, improved version of the Light Laser. ' +
      'Being more balanced than the Light Laser with improved alloy composition, ' +
      'it utilizes stronger, ' +
      'more densely packed beams, and even better onboard targeting systems. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
    });
  },
};

export default heavyLaser;
