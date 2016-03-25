import AstrophysicsType from '../types/AstrophysicsType';

const astrophysics = {
  type: AstrophysicsType,
  resolve({ user }) {
    const level = 23; // TODO
    return {
      id: 8520, // TODO
      name: 'Astrophysics',
      description: 'With an astrophysics research module, ships can undertake long expeditions. ' +
      'Every second level of this technology will allow you to colonise an extra planet.',
      longDescription: 'Further findings in the field of astrophysics allow for the construction ' +
      'of laboratories that can be fitted on more and more ships. ' +
      'This makes long expeditions far into unexplored areas of space possible. ' +
      'In addition these advancements can be used to further colonise the universe. ' +
      'For every two levels of this technology an additional planet can be made usable.',
      level,
      maximumColonies: Math.ceil(level / 2), // TODO must go on model logic
      maximumExpeditions: Math.floor(Math.sqrt(level)), // TODO must go on model logic
    };
  },
};

export default astrophysics;
