import { PlasmaTurretType } from '../../types/defenses';
import shipyard from '../buildings/shipyard';
import plasmaTech from '../technologies/plasmaTech';

const plasmaTurret = {
  type: PlasmaTurretType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 8 }, // TODO check
        { technology: plasmaTech.resolve({ user }), level: 7 }, // TODO check
      ],
      structuralIntegrity: 100000,
      shieldStrength: 300,
      attackStrength: 3000,
    };
  },
};

export default plasmaTurret;
