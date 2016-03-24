import ShieldingTechType from '../types/ShieldingTechType';

const shieldingTech = {
  type: ShieldingTechType,
  resolve({ user }) {
    return {
      id: 413975, // TODO
      name: 'Shielding Technology',
      description: 'Shielding technology makes the shields on ships and defensive facilities more efficient. ' +
      'Each level of shield technology increases the strength of the shields by 10% of the base value.',
      level: 8, // TODO
    };
  },
};

export default shieldingTech;
