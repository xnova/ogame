import WeaponsTechType from '../types/WeaponsTechType';

const weaponsTech = {
  type: WeaponsTechType,
  resolve({ user }) {
    const level = 20; // TODO
    return {
      id: 44144, // TODO
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
      level,
      bonus: level * 0.1,
      requirements: [
        { technology: 'lab', level: 4}, // TODO research lab
      ],
    };
  },
};

export default weaponsTech;
