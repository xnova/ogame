import { EnergyTechType } from '../../types/technologies';
import { Technology } from '../../models';

// TODO maybe specialized data like efficiency?

const energyTech = {
  type: EnergyTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.ENERGY_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Energy Technology',
      description: 'The command of different types of energy is necessary ' +
      'for many new technologies.',
      longDescription: 'As various fields of research advanced, ' +
      'it was discovered that the current technology of energy distribution was not sufficient ' +
      'enough to begin certain specialized research. ' +
      'With each upgrade of your Energy Technology, ' +
      'new research can be conducted which unlocks development of ' +
      'more sophisticated ships and defences.',
    });
  },
};

export default energyTech;
