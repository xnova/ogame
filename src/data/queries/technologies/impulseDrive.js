import { ImpulseDriveType } from '../../types/technologies';
import { Technology } from '../../models';

const impulseDrive = {
  type: ImpulseDriveType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.IMPULSE_DRIVE_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
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
    });
  },
};

export default impulseDrive;
