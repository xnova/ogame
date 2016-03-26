import { ResearchLabType } from '../../types/buildings';

const researchLab = {
  type: ResearchLabType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Research Lab',
      description: 'A research lab is required in order to conduct research into new technologies.',
      longDescription: 'An essential part of any empire, ' +
      'Research Labs are where new technologies are discovered and ' +
      'older technologies are improved upon. ' +
      'With each level of the Research Lab constructed, ' +
      'the speed in which new technologies are researched is increased, ' +
      'while also unlocking newer technologies to research. ' +
      'In order to conduct research as quickly as possible, ' +
      'research scientists are immediately dispatched to ' +
      'the colony to begin work and development. ' +
      'In this way, ' +
      'knowledge about new technologies can easily be disseminated throughout the empire.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default researchLab;
