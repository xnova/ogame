import { LargeShieldDomeType } from '../../types/defenses';
import shipyard from '../buildings/shipyard';
import shieldingTech from '../technologies/shieldingTech';

const largeShieldDome = {
  type: LargeShieldDomeType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 6 }, // TODO check
        { technology: shieldingTech.resolve({ user }), level: 6 }, // TODO check
      ],
      structuralIntegrity: 100000,
      shieldStrength: 10000,
      attackStrength: 1,
    };
  },
};

export default largeShieldDome;
