import ArmourTechType from '../types/ArmourTechType';

const armourTech = {
  type: ArmourTechType,
  resolve({ user }) {
    return {
      id: 654, // TODO
      name: 'Armour Technology',
      description: 'Special alloys improve the armour on ships and defensive structures. ' +
      'The effectiveness of the armour can be increased by 10% per level.',
      level: 1, // TODO
    };
  },
};

export default armourTech;
