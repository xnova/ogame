import { SmallShieldDomeType } from '../../types/defenses';
import { Defense } from '../../models';

const smallShieldDome = {
  type: SmallShieldDomeType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Defense.SMALL_SHIELD_DOME_ID };
    let defense = await Defense.findOne({ where });
    if (!defense) {
      defense = Defense.build(where);
    }
    return Object.assign(defense, {
      name: 'Small Shield Dome',
      description: 'The small shield dome covers an entire planet with a field which can ' +
      'absorb a tremendous amount of energy.',
      longDescription: 'Colonizing new worlds brought about a new danger, space debris. ' +
      'A large asteroid could easily wipe out the world and all inhabitants. ' +
      'Advancements in shielding technology provided scientists with ' +
      'a way to develop a shield to ' +
      'protect an entire planet not only from space debris but, ' +
      'as it was learned, from an enemy attack. ' +
      'By creating a large electromagnetic field around the planet, ' +
      'space debris that would normally have destroyed the planet was deflected, ' +
      'and attacks from enemy Empires were thwarted. ' +
      'The first generators were large and the shield provided moderate protection, ' +
      'but it was later discovered that small shields did not ' +
      'afford the protection from larger scale attacks. ' +
      'The small shield dome was the prelude to a stronger, ' +
      'more advanced planetary shielding system to come. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
    });
  },
};

export default smallShieldDome;
