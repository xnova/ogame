import { ComputerTechType } from '../../types/technologies';
import { Technology } from '../../models';

const computerTech = {
  type: ComputerTechType,
  async resolve({ user }) {
    const where = { UserId: 1, techId: Technology.COMPUTER_TECH_ID };
    let technology = await Technology.findOne({ where });
    if (!technology) {
      technology = Technology.build(where);
    }
    return Object.assign(technology, {
      name: 'Computer Technology',
      description: 'More fleets can be commanded by increasing computer capacities. ' +
      'Each level of computer technology increases the maximum number of fleets by one.',
      longDescription: 'Once launched on any mission, fleets are controlled primarily by ' +
      'a series of computers located on the originating planet. ' +
      'These massive computers calculate the exact time of arrival, ' +
      'controls course corrections as needed, calculates trajectories, ' +
      'and regulates flight speeds.' +
      '' + // TODO check newline
      'With each level researched, the flight computer is upgraded to allow an additional ' +
      'slot to be launched. ' +
      'Computer technology should be continuously developed throughout the building of ' +
      'your empire.',
    });
  },
};

export default computerTech;
