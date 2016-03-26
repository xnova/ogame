import ArmourTechType from '../../types/technologies/ArmourTechType';

const armourTech = {
  type: ArmourTechType,
  resolve({ user }) {
    const level = 8; // TODO
    return {
      id: 654, // TODO
      name: 'Armour Technology',
      description: 'Special alloys improve the armour on ships and defensive structures. ' +
      'The effectiveness of the armour can be increased by 10% per level.',
      longDescription: 'The environment of deep space is harsh. ' +
      'Pilots and crew on various missions not only faced intense solar radiation, ' +
      'they also faced the prospect of being hit by space debris, ' +
      'or destroyed by enemy fire in an attack. ' +
      'With the discovery of an aluminum-lithium titanium carbide alloy, ' +
      'which was found to be both light weight and durable, ' +
      'this afforded the crew a certain degree of protection. ' +
      'With each level of Armour Technology developed, a higher quality alloy is produced, ' +
      'which increases the armours strength by 10%.',
      level,
      bonus: level * 0.1,
      requirements: [
        { technology: 'lab', level: 2 }, // TODO research lab
      ],
    };
  },
};

export default armourTech;
