import { LargeShieldDomeType } from '../../types/defenses';
import { Defense } from '../../models';

const largeShieldDome = {
  type: LargeShieldDomeType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Defense.LARGE_SHIELD_DOME_ID };
    let defense = await Defense.findOne({ where });
    if (!defense) {
      defense = Defense.build(where);
    }
    return Object.assign(defense, {
      name: 'Large Shield Dome',
      description: 'The evolution of the small shield dome can employ significantly ' +
      'more energy to withstand attacks.',
      longDescription: 'The Large Shield Dome is ' +
      'the next step in the advancement of planetary shields, ' +
      'it is the result of years of work improving the Small Shield Dome. ' +
      'Built to withstand a larger barrage of enemy fire by providing ' +
      'a higher energized electromagnetic field, ' +
      'large domes provide a longer period of protection before collapsing. ' +
      '' + // TODO paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
    });
  },
};

export default largeShieldDome;
