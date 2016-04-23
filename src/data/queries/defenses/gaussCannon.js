import { GaussCannonType } from '../../types/defenses';
import { Defense } from '../../models';

const gaussCannon = {
  type: GaussCannonType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Defense.GAUSS_CANNON_ID };
    let defense = await Defense.findOne({ where });
    if (!defense) {
      defense = Defense.build(where);
    }
    return Object.assign(defense, {
      name: 'Gauss Cannon',
      description: 'The Gauss Cannon fires projectiles weighing tons at high speeds.',
      longDescription: 'For a long time projectile weapons were regarded as antiquated in ' +
      'the wake of modern thermonuclear and ' +
      'energy technology and due to the development of the hyperdrive and improved armour. ' +
      'That was until the exact energy technology that had once aged it, ' +
      'helped it to re-achieve their established position. ' +
      '' + // TODO newline
      'A gauss cannon is a large version of the particle accelerator. ' +
      'Extremely heavy missiles are accelerated with a huge electromagnetic force and ' +
      'have muzzle velocities that make the dirt surrounding the missile burn in the skies. ' +
      'This weapon is so powerful when fired that it creates a sonic boom. ' +
      'Modern armour and shields can barely withstand the force, ' +
      'often the target is completely penetrated by the power of the missile. ' +
      'Defence structures deactivate as soon as they have been too badly damaged. ' +
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
    });
  },
};

export default gaussCannon;
