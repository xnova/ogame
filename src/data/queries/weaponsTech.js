import WeaponsTechType from '../types/WeaponsTechType';

const weaponsTech = {
  type: WeaponsTechType,
  resolve({ user }) {
    return {
      id: 44144, // TODO
      name: 'Weapons Technology',
      description: 'Weapons technology makes weapons systems more efficient. ' +
      'Each level of weapons technology increases the weapon strength ' +
      'of units by 10% of the base value.',
      level: 20, // TODO
    };
  },
};

export default weaponsTech;
