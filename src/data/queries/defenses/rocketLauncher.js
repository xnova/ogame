import { RocketLauncherType } from '../../types/defenses';
import shipyard from '../buildings/shipyard';

const rocketLauncher = {
  type: RocketLauncherType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
      name: 'Rocket Launcher',
      description: 'The rocket launcher is a simple, cost-effective defensive option.',
      longDescription: 'Your first basic line of defence. ' +
      'These are simple ground based launch facilities that ' +
      'fire conventional warhead tipped missiles at attacking enemy targets. ' +
      'As they are cheap to construct and no research is required, ' +
      'they are well suited for defending raids, ' +
      'but lose effectiveness defending from larger scale attacks. ' +
      'Once you begin construction on more advanced defence weapons systems, ' +
      'Rocket Launchers become simple fodder to allow your more ' +
      'damaging weapons to inflict greater damage for a longer period of time. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 1 }, // TODO check
      ],
      structuralIntegrity: 2000,
      shieldStrength: 20,
      attackStrength: 80,
    };
  },
};

export default rocketLauncher;
