import { IonCannonType } from '../../types/defenses';
import { Defense } from '../../models';

const ionCannon = {
  type: IonCannonType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Defense.ION_CANNON_ID };
    let defense = await Defense.findOne({ where });
    if (!defense) {
      defense = Defense.build(where);
    }
    return Object.assign(defense, {
      name: 'Ion Cannon',
      description: 'The Ion Cannon fires a continuous beam of accelerating ions, ' +
      'causing considerable damage to objects it strikes.',
      longDescription: 'An ion cannon is a weapon that fires beams of ions ' +
      '(positively or negatively charged particles). ' +
      'The Ion Cannon is actually a type of Particle Cannon; ' +
      'only the particles used are ionized. ' +
      'Due to their electrical charges, ' +
      'they also have the potential to disable electronic devices, ' +
      'and anything else that has an electrical or similar power source, ' +
      'using a phenomena known as the the Electromagetic Pulse (EMP effect). ' +
      'Due to the cannons highly improved shielding system, ' +
      'this cannon provides improved protection for your larger, ' +
      'more destructive defence weapons. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
    });
  },
};

export default ionCannon;
