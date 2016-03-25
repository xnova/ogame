import ImpulseDriveType from '../types/ImpulseDriveType';
import energyTech from './energyTech';

const impulseDrive = {
  type: ImpulseDriveType,
  resolve({ user }) {
    const level = 7; // TODO
    return {
      id: 99, // TODO
      name: 'Impulse Drive',
      description: 'The impulse drive is based on the reaction principle. ' +
      'Further development of this drive makes some ships faster, ' +
      'although each level increases speed by only 20% of the base value.',
      longDescription: 'The impulse drive is based on the recoil principle, by which ' +
      'the stimulated emission of radiation is mainly produced as a waste product from ' +
      'the core fusion to gain energy. ' +
      'Additionally, other masses can be injected. ' +
      'With each level of the Impulse Drive developed, ' +
      'the speed of bombers, cruisers, heavy fighters, and colony ships are increased by ' +
      '20% of the base value. ' +
      'The small transporter is also equipped with an impulse drive, as soon as the research ' +
      'reaches level 5. ' +
      'Recyclers will be equipped with an impulse drive once researched to level 17. ' +
      '' + // TODO check newline
      'Interplanetary missiles also travel farther with each level.',
      level,
      speedFactor: 1 + 0.2 * level,
      requirements: [
        { technology: 'lab', level: 2 }, // TODO research lab
        { technology: energyTech.resolve({ user }), level: 1 }, // TODO check
      ],
    };
  },
};

export default impulseDrive;
