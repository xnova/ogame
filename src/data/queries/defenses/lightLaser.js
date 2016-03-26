import { LightLaserType } from '../../types/defenses';
import shipyard from '../buildings/shipyard';
import laserTech from '../technologies/laserTech';

const lightLaser = {
  type: LightLaserType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
      name: 'Light Laser',
      description: 'Concentrated firing at a target with photons can ' +
      'produce significantly greater damage than standard ballistic weapons.',
      longDescription: 'As technology developed and more sophisticated ships were created, ' +
      'it was determined that a stronger line of defence was needed to counter the attacks. ' +
      'As Laser Technology advanced, ' +
      'a new weapon was designed to provide the next level of defence. ' +
      'Light Lasers are simple ground based weapons that utilize special targeting systems to ' +
      'track the enemy and fire a high intensity laser designed to ' +
      'cut through the hull of the target. ' +
      'In order to be kept cost effective, they were fitted with an improved shielding system, ' +
      'however the structural integrity is the same as that of the Rocket Launcher. ' +
      '' + // TODO new paragraph
      'After a battle, ' +
      'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 2 }, // TODO check
        { technology: laserTech.resolve({ user }), level: 3 }, // TODO check
      ],
      structuralIntegrity: 2000,
      shieldStrength: 25,
      attackStrength: 100,
    };
  },
};

export default lightLaser;
