import Promise from 'bluebird';

import BaseTech from '../BaseTech';
import Resources from '../Resources';
import Ship from '../Ship';
import ShipTech from '../ShipTech';
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

const SMALL_CARGO = ShipTech.create({
  techId: Ship.SMALL_CARGO_ID,
  unit: {
    costs: {
      metal: 2000,
      crystal: 2000,
    },
    baseTech: {},
    basicShield: 10,
    basicAttack: 5,
  },
  basicSpeed: 5000,
  cargoCapacity: 5000,
  fuelUsage: 10,
}, { include });

const LARGE_CARGO = ShipTech.create({
  techId: Ship.LARGE_CARGO_ID,
  unit: {
    costs: {
      metal: 6000,
      crystal: 6000,
    },
    baseTech: {},
    basicShield: 25,
    basicAttack: 5,
  },
  basicSpeed: 7500,
  cargoCapacity: 25000,
  fuelUsage: 50,
}, { include });

const LIGHT_FIGHTER = ShipTech.create({
  techId: Ship.LIGHT_FIGHTER_ID,
  unit: {
    costs: {
      metal: 3000,
      crystal: 1000,
    },
    baseTech: {},
    basicShield: 10,
    basicAttack: 50,
  },
  basicSpeed: 12500,
  cargoCapacity: 50,
  fuelUsage: 20,
}, { include });

const HEAVY_FIGHTER = ShipTech.create({
  techId: Ship.HEAVY_FIGHTER_ID,
  unit: {
    costs: {
      metal: 6000,
      crystal: 4000,
    },
    baseTech: {},
    basicShield: 25,
    basicAttack: 150,
  },
  basicSpeed: 10000,
  cargoCapacity: 100,
  fuelUsage: 75,
}, { include });

const CRUISER = ShipTech.create({
  techId: Ship.CRUISER_ID,
  unit: {
    costs: {
      metal: 20000,
      crystal: 7000,
      deuterium: 2000,
    },
    baseTech: {},
    basicShield: 50,
    basicAttack: 400,
  },
  basicSpeed: 15000,
  cargoCapacity: 800,
  fuelUsage: 300,
}, { include });

const BATTLESHIP = ShipTech.create({
  techId: Ship.BATTLESHIP_ID,
  unit: {
    costs: {
      metal: 45000,
      crystal: 15000,
    },
    baseTech: {},
    basicShield: 200,
    basicAttack: 1000,
  },
  basicSpeed: 10000,
  cargoCapacity: 1500,
  fuelUsage: 500,
}, { include });

const COLONY_SHIP = ShipTech.create({
  techId: Ship.COLONY_SHIP_ID,
  unit: {
    costs: {
      metal: 10000,
      crystal: 20000,
      deuterium: 10000,
    },
    baseTech: {},
    basicShield: 100,
    basicAttack: 50,
  },
  basicSpeed: 2500,
  cargoCapacity: 7500,
  fuelUsage: 1000,
}, { include });

const RECYCLER = ShipTech.create({
  techId: Ship.RECYCLER_ID,
  unit: {
    costs: {
      metal: 10000,
      crystal: 6000,
      deuterium: 2000,
    },
    baseTech: {},
    basicShield: 10,
    basicAttack: 1,
  },
  basicSpeed: 2000,
  cargoCapacity: 20000,
  fuelUsage: 300,
}, { include });

const ESPIONAGE_PROBE = ShipTech.create({
  techId: Ship.ESPIONAGE_PROBE_ID,
  unit: {
    costs: {
      crystal: 1000,
    },
    baseTech: {},
    basicShield: 0.01,
    basicAttack: 0.01,
  },
  basicSpeed: 10 ** 8,
  cargoCapacity: 0,
  fuelUsage: 1,
}, { include });

const BOMBER = ShipTech.create({
  techId: Ship.BOMBER_ID,
  unit: {
    costs: {
      metal: 50000,
      crystal: 25000,
      deuterium: 15000,
    },
    baseTech: {},
    basicShield: 500,
    basicAttack: 1000,
  },
  basicSpeed: 4000,
  cargoCapacity: 500,
  fuelUsage: 1000,
}, { include });

const SOLAR_SATELLITE = ShipTech.create({
  techId: Ship.SOLAR_SATELLITE_ID,
  unit: {
    costs: {
      crystal: 2000,
      deuterium: 500,
    },
    baseTech: {},
    basicShield: 1,
    basicAttack: 1,
  },
  basicSpeed: 0,
  cargoCapacity: 0,
  fuelUsage: 0,
}, { include });

const DESTROYER = ShipTech.create({
  techId: Ship.DESTROYER_ID,
  unit: {
    costs: {
      metal: 60000,
      crystal: 50000,
      deuterium: 15000,
    },
    baseTech: {},
    basicShield: 500,
    basicAttack: 2000,
  },
  basicSpeed: 5000,
  cargoCapacity: 2000,
  fuelUsage: 1000,
}, { include });

const DEATH_STAR = ShipTech.create({
  techId: Ship.DEATH_STAR_ID,
  unit: {
    costs: {
      metal: 5000000,
      crystal: 4000000,
      deuterium: 1000000,
    },
    baseTech: {},
    basicShield: 50000,
    basicAttack: 200000,
  },
  basicSpeed: 100,
  cargoCapacity: 1000000,
  fuelUsage: 1,
}, { include });

const BATTLE_CRUISER = ShipTech.create({
  techId: Ship.BATTLE_CRUISER_ID,
  unit: {
    costs: {
      metal: 30000,
      crystal: 40000,
      deuterium: 15000,
    },
    baseTech: {},
    basicShield: 400,
    basicAttack: 700,
  },
  basicSpeed: 10000,
  cargoCapacity: 750,
  fuelUsage: 250,
}, { include });


export default Promise.all([
  SMALL_CARGO,
  LARGE_CARGO,
  LIGHT_FIGHTER,
  HEAVY_FIGHTER,
  CRUISER,
  BATTLESHIP,
  COLONY_SHIP,
  RECYCLER,
  ESPIONAGE_PROBE,
  BOMBER,
  SOLAR_SATELLITE,
  DESTROYER,
  DEATH_STAR,
  BATTLE_CRUISER,
]).then((values) => ({
  // TODO code this better. like python itertools.zip()
  SMALL_CARGO: values[0],
  LARGE_CARGO: values[1],
  LIGHT_FIGHTER: values[2],
  HEAVY_FIGHTER: values[3],
  CRUISER: values[4],
  BATTLESHIP: values[5],
  COLONY_SHIP: values[6],
  RECYCLER: values[7],
  ESPIONAGE_PROBE: values[8],
  BOMBER: values[9],
  SOLAR_SATELLITE: values[10],
  DESTROYER: values[11],
  DEATH_STAR: values[12],
  BATTLE_CRUISER: values[13],
}));
