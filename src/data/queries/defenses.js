import {
  RocketLauncherType,
  LightLaserType,
  HeavyLaserType,
  GaussCannonType,
  IonCannonType,
  PlasmaTurretType,
  SmallShieldDomeType,
  LargeShieldDomeType,
} from '../types/defenses';
import { Defense } from '../models';


class DefenseQuery {
  constructor({ type, techId, name, description, longDescription }) {
    return {
      type,
      async resolve({ planet }) {
        const where = { PlanetId: 1, techId };
        let defense = await Defense.findOne({ where });
        if (!defense) {
          defense = Defense.build(where);
        }
        return Object.assign(defense, { name, description, longDescription });
      },
    };
  }
}

const rocketLauncher = new DefenseQuery({
  type: RocketLauncherType,
  techId: Defense.ROCKET_LAUNCHER_ID,
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
});

const lightLaser = new DefenseQuery({
  type: LightLaserType,
  techId: Defense.LIGHT_LASER_ID,
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
});

const heavyLaser = new DefenseQuery({
  type: HeavyLaserType,
  techId: Defense.HEAVY_LASER_ID,
  name: 'Heavy Laser',
  description: 'The heavy laser is the logical development of the light laser.',
  longDescription: 'The Heavy Laser is a practical, improved version of the Light Laser. ' +
  'Being more balanced than the Light Laser with improved alloy composition, ' +
  'it utilizes stronger, ' +
  'more densely packed beams, and even better onboard targeting systems. ' +
  '' + // TODO new paragraph
  'After a battle, ' +
  'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
});

const gaussCannon = new DefenseQuery({
  type: GaussCannonType,
  techId: Defense.GAUSS_CANNON_ID,
  name: 'Gauss Cannon',
  description: 'The Gauss Cannon fires projectiles weighing tons at high speeds.',
  longDescription: 'For a long time projectile weapons were regarded as antiquated in ' +
  'the wake of modern thermonuclear and ' +
  'energy technology and due to the development of the hyperdrive and improved armour. ' +
  'That was until the exact energy technology that had once aged it, ' +
  'helped it to re-achieve their established position. ' +
  '' + // TODO newline
  'A gauss cannon is a large version of the particle accelerator. ' +
  'Extremely heavy missiles are accelerated with a huge electromagnetic force and ' +
  'have muzzle velocities that make the dirt surrounding the missile burn in the skies. ' +
  'This weapon is so powerful when fired that it creates a sonic boom. ' +
  'Modern armour and shields can barely withstand the force, ' +
  'often the target is completely penetrated by the power of the missile. ' +
  'Defence structures deactivate as soon as they have been too badly damaged. ' +
  'After a battle, ' +
  'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
});

const ionCannon = new DefenseQuery({
  type: IonCannonType,
  techId: Defense.ION_CANNON_ID,
  name: 'Ion Cannon',
  description: 'The Ion Cannon fires a continuous beam of accelerating ions, ' +
  'causing considerable damage to objects it strikes.',
  longDescription: 'An ion cannon is a weapon that fires beams of ions ' +
  '(positively or negatively charged particles). ' +
  'The Ion Cannon is actually a type of Particle Cannon; ' +
  'only the particles used are ionized. ' +
  'Due to their electrical charges, ' +
  'they also have the potential to disable electronic devices, ' +
  'and anything else that has an electrical or similar power source, ' +
  'using a phenomena known as the the Electromagetic Pulse (EMP effect). ' +
  'Due to the cannons highly improved shielding system, ' +
  'this cannon provides improved protection for your larger, ' +
  'more destructive defence weapons. ' +
  '' + // TODO new paragraph
  'After a battle, ' +
  'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
});

const plasmaTurret = new DefenseQuery({
  type: PlasmaTurretType,
  techId: Defense.PLASMA_TURRET_ID,
  name: 'Plasma Turret',
  description: 'Concentrated firing at a target with photons can ' +
  'produce significantly greater damage than standard ballistic weapons.',
  longDescription: 'One of the most advanced defence weapons systems ever developed, ' +
  'the Plasma Turret uses a large nuclear reactor fuel cell to ' +
  'power an electromagnetic accelerator that fires a pulse, or toroid, of plasma. ' +
  'During operation, ' +
  'the Plasma turret first locks on a target and begins the process of firing. ' +
  'A plasma sphere is created in the turrets core by super heating and compressing gases, ' +
  'stripping them of their ions. ' +
  'Once the gas is superheated, compressed, and a plasma sphere is created, ' +
  'it is then loaded into the electromagnetic accelerator which is energized. ' +
  'Once fully energized, the accelerator is activated, ' +
  'which results in the plasma sphere being launched at ' +
  'an extremely high rate of speed to the intended target. ' +
  'From the targets perspective, the approaching bluish ball of plasma is impressive, ' +
  'but once it strikes, it causes instant destruction. ' +
  '' + // TODO new paragraph
  'Defensive facilities deactivate as soon as they are too heavily damaged. ' +
  'After a battle, ' +
  'there is up to a 70% chance that failed defensive facilities can be returned to use.',
});

const smallShieldDome = new DefenseQuery({
  type: SmallShieldDomeType,
  techId: Defense.SMALL_SHIELD_DOME_ID,
  name: 'Small Shield Dome',
  description: 'The small shield dome covers an entire planet with a field which can ' +
  'absorb a tremendous amount of energy.',
  longDescription: 'Colonizing new worlds brought about a new danger, space debris. ' +
  'A large asteroid could easily wipe out the world and all inhabitants. ' +
  'Advancements in shielding technology provided scientists with ' +
  'a way to develop a shield to ' +
  'protect an entire planet not only from space debris but, ' +
  'as it was learned, from an enemy attack. ' +
  'By creating a large electromagnetic field around the planet, ' +
  'space debris that would normally have destroyed the planet was deflected, ' +
  'and attacks from enemy Empires were thwarted. ' +
  'The first generators were large and the shield provided moderate protection, ' +
  'but it was later discovered that small shields did not ' +
  'afford the protection from larger scale attacks. ' +
  'The small shield dome was the prelude to a stronger, ' +
  'more advanced planetary shielding system to come. ' +
  '' + // TODO new paragraph
  'After a battle, ' +
  'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
});

const largeShieldDome = new DefenseQuery({
  type: LargeShieldDomeType,
  techId: Defense.LARGE_SHIELD_DOME_ID,
  name: 'Large Shield Dome',
  description: 'The evolution of the small shield dome can employ significantly ' +
  'more energy to withstand attacks.',
  longDescription: 'The Large Shield Dome is ' +
  'the next step in the advancement of planetary shields, ' +
  'it is the result of years of work improving the Small Shield Dome. ' +
  'Built to withstand a larger barrage of enemy fire by providing ' +
  'a higher energized electromagnetic field, ' +
  'large domes provide a longer period of protection before collapsing. ' +
  '' + // TODO paragraph
  'After a battle, ' +
  'there is up to a 70 % chance that failed defensive facilities can be returned to use.',
});

export default {
  gaussCannon,
  heavyLaser,
  ionCannon,
  largeShieldDome,
  lightLaser,
  plasmaTurret,
  rocketLauncher,
  smallShieldDome,
};
