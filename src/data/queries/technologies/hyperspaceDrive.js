import HyperspaceDriveType from '../../types/technologies/HyperspaceDriveType';
import hyperspaceTech from './hyperspaceTech';

const hyperspaceDrive = {
  type: HyperspaceDriveType,
  resolve({ user }) {
    const level = 6; // TODO
    return {
      id: 9, // TODO
      name: 'Hyperspace Drive',
      description: 'Hyperspace drive warps space around a ship. ' +
      'The development of this drive makes some ships faster, although each level ' +
      'increases speed by only 30% of the base value.',
      longDescription: 'In the immediate vicinity of the ship the space is warped so ' +
      'that long distances can be covered very quickly. ' +
      'The more the HyperSpace Drive is developed, the stronger the warped nature of the space, ' +
      'whereby the speed of the ships equipped with it (Battlecruiser, Battleships, Destroyer, ' +
      'Deathstar) increase by 30% per level. ' +
      'The bomber is also provided with a HyperSpace Drive as soon as ' +
      'the research level reaches 8. ' +
      'Recyclers will be upgraded to HyperSpace Drives once research gains level 15.',
      level,
      speedFactor: 1 + 0.3 * level,
      requirements: [
        { technology: hyperspaceTech.resolve({ user }), level: 3 }, // TODO check
      ],
    };
  },
};

export default hyperspaceDrive;
