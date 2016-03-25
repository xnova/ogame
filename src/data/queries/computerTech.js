import ComputerTechType from '../types/ComputerTechType';

const computerTech = {
  type: ComputerTechType,
  resolve({ user }) {
    const level = 9; // TODO
    return {
      id: 213, // TODO
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
      level,
      fleetSlots: level + 1, // TODO model logic
      requirements: [
        { technology: 'lab', level: 1}, // TODO research lab
      ],
    };
  },
};

export default computerTech;
