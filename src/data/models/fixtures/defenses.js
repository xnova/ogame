import Promise from 'bluebird';

import BaseTech from '../BaseTech';
import Resources from '../Resources';
import Defense from '../Defense';
import DefenseTech from '../DefenseTech';
import UnitTech from '../UnitTech';


const include = [
  {
    model: UnitTech,
    as: 'unit',
    include: [
      { model: Resources, as: 'costs' },
      { model: BaseTech, as: 'baseTech' },
    ],
  },
];

const ROCKET_LAUNCHER = DefenseTech.create({
  techId: Defense.ROCKET_LAUNCHER_ID,
  unit: {
    costs: {
      metal: 2000,
    },
    baseTech: {},
    basicShield: 20,
    basicAttack: 80,
  },
}, { include });

const LIGHT_LASER = DefenseTech.create({
  techId: Defense.LIGHT_LASER_ID,
  unit: {
    costs: {
      metal: 1500,
      crystal: 500,
    },
    baseTech: {},
    basicShield: 25,
    basicAttack: 100,
  },
}, { include });

const HEAVY_LASER = DefenseTech.create({
  techId: Defense.HEAVY_LASER_ID,
  unit: {
    costs: {
      metal: 6000,
      crystal: 2000,
    },
    baseTech: {},
    basicShield: 100,
    basicAttack: 250,
  },
}, { include });

const GAUSS_CANNON = DefenseTech.create({
  techId: Defense.GAUSS_CANNON_ID,
  unit: {
    costs: {
      metal: 20000,
      crystal: 15000,
      deuterium: 2000,
    },
    baseTech: {},
    basicShield: 200,
    basicAttack: 1100,
  },
}, { include });

const ION_CANNON = DefenseTech.create({
  techId: Defense.ION_CANNON_ID,
  unit: {
    costs: {
      metal: 2000,
      crystal: 6000,
    },
    baseTech: {},
    basicShield: 500,
    basicAttack: 150,
  },
}, { include });

const PLASMA_TURRET = DefenseTech.create({
  techId: Defense.PLASMA_TURRET_ID,
  unit: {
    costs: {
      metal: 50000,
      crystal: 50000,
      deuterium: 30000,
    },
    baseTech: {},
    basicShield: 300,
    basicAttack: 3000,
  },
}, { include });

const SMALL_SHIELD_DOME = DefenseTech.create({
  techId: Defense.SMALL_SHIELD_DOME_ID,
  unit: {
    costs: {
      metal: 10000,
      crystal: 10000,
    },
    baseTech: {},
    basicShield: 2000,
    basicAttack: 1,
    maxQuantity: 1,
  },
}, { include });

const LARGE_SHIELD_DOME = DefenseTech.create({
  techId: Defense.LARGE_SHIELD_DOME_ID,
  unit: {
    costs: {
      metal: 50000,
      crystal: 50000,
    },
    baseTech: {},
    basicShield: 10000,
    basicAttack: 1,
    maxQuantity: 1,
  },
}, { include });


export default Promise.all([
  ROCKET_LAUNCHER,
  LIGHT_LASER,
  HEAVY_LASER,
  GAUSS_CANNON,
  ION_CANNON,
  PLASMA_TURRET,
  SMALL_SHIELD_DOME,
  LARGE_SHIELD_DOME,
]).then((values) => ({
  ROCKET_LAUNCHER: values[0],
  LIGHT_LASER: values[1],
  HEAVY_LASER: values[2],
  GAUSS_CANNON: values[3],
  ION_CANNON: values[4],
  PLASMA_TURRET: values[5],
  SMALL_SHIELD_DOME: values[6],
  LARGE_SHIELD_DOME: values[7],
}));
