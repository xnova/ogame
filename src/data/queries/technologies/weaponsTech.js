import { WeaponsTechType } from '../../types/technologies';
import { Technology } from '../../models';

const weaponsTech = {
  type: WeaponsTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.WEAPONS_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Weapons Technology',
      description: 'Weapons technology makes weapons systems more efficient. ' +
      'Each level of weapons technology increases the weapon strength ' +
      'of units by 10% of the base value.',
      longDescription: 'Weapons Technology is a key research technology and is critical to ' +
      'your survival against enemy Empires. ' +
      'With each level of Weapons Technology researched, ' +
      'the weapons systems on ships and your defence mechanisms ' +
      'become increasingly more efficient. ' +
      'Each level increases the base strength of your weapons by 10% of the base value.',
    });
  },
};

export default weaponsTech;
