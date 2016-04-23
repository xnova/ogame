import { EspionageTechType } from '../../types/technologies';
import { Technology } from '../../models';

// TODO specialized data?

const espionageTech = {
  type: EspionageTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.ESPIONAGE_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Espionage Technology',
      description: 'Information about other planets and moons can be gained using this technology.',
      longDescriion: 'Espionage Technology is, ' +
      'in the first instance, an advancement of sensor technology. ' +
      'The more advanced this technology is, ' +
      'the more information the user receives about activities in his environment.' +
      '' + // TODO check newline
      'The differences between your own spy level and opposing spy levels is crucial for ' +
      'probes. ' +
      'The more advanced your own espionage technology is, ' +
      'the more information the report can gather and ' +
      'the smaller the chance is that your espionage activities are discovered. ' +
      'The more probes that you send on one mission, the more details they can gather from ' +
      'the target planet. ' +
      'But at the same time it also increases the chance of discovery. ' +
      '' + // TODO check newline
      'Espionage technology also improves the chance of locating foreign fleets. ' +
      'The espionage level is vital in determining this. ' +
      'From level 2 onwards, ' +
      'the exact total number of attacking ships is displayed as well as ' +
      'the normal attack notification. ' +
      'And from level 4 onwards, ' +
      'the type of attacking ships as well as the total number is shown and from level 8 ' +
      'onwards the exact number of different ship types is shown. ' +
      '' + // TODO check newline
      'This technology is indispensable for an upcoming attack, ' +
      'as it informs you whether the victim fleet has defence available or not. ' +
      'That is why this technology should be researched very early on.',
    });
  },
};

export default espionageTech;
