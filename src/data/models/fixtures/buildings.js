import Promise from 'bluebird';

import BaseTech from '../BaseTech';
import Building from '../Building';
import BuildingTech from '../BuildingTech';
import LevelTech from '../LevelTech';
import Resources from '../Resources';


const include = [
  {
    model: LevelTech,
    as: 'levelTech',
    include: [
      {
        model: Resources,
        as: 'basicCosts',
      },
      {
        model: BaseTech,
        as: 'baseTech',
      },
    ],
  },
];


const META_MINE = BuildingTech.create({
  techId: Building.METAL_MINE_ID,
  levelTech: {
    basicCosts: {
      metal: 60,
      crystal: 15,
    },
    baseTech: {},
    costFactor: 1.5,
  },
}, { include });

const CRYSTAL_MINE = BuildingTech.create({
  techId: Building.CRYSTAL_MINE_ID,
  levelTech: {
    basicCosts: {
      metal: 48,
      crystal: 24,
    },
    baseTech: {},
    costFactor: 1.6,
  },
}, { include });

const DEUTERIUM_SYNTHESIZER = BuildingTech.create({
  techId: Building.DEUTERIUM_SYNTHESIZER_ID,
  levelTech: {
    basicCosts: {
      metal: 225,
      crystal: 75,
    },
    baseTech: {},
    costFactor: 1.5,
  },
}, { include });

const SOLAR_PLANT = BuildingTech.create({
  techId: Building.SOLAR_PLANT_ID,
  levelTech: {
    basicCosts: {
      metal: 75,
      crystal: 30,
    },
    baseTech: {},
    costFactor: 1.5,
  },
}, { include });

const FUSION_REACTOR = BuildingTech.create({
  techId: Building.FUSION_REACTOR_ID,
  levelTech: {
    basicCosts: {
      metal: 900,
      crystal: 360,
      deuterium: 180,
    },
    baseTech: {},
    costFactor: 1.8,
  },
}, { include });

const ROBOTICS_FACTORY = BuildingTech.create({
  techId: Building.ROBOTICS_FACTORY_ID,
  levelTech: {
    basicCosts: {
      metal: 400,
      crystal: 120,
      deuterium: 200,
    },
    baseTech: {},
  },
}, { include });

const NANITE_FACTORY = BuildingTech.create({
  techId: Building.NANITE_FACTORY_ID,
  levelTech: {
    basicCosts: {
      metal: 10 ** 6,
      crystal: 500000,
      deuterium: 10 ** 5,
    },
    baseTech: {},
  },
}, { include });

const SHIPYARD = BuildingTech.create({
  techId: Building.SHIPYARD_ID,
  levelTech: {
    basicCosts: {
      metal: 400,
      crystal: 200,
      deuterium: 100,
    },
    baseTech: {},
  },
}, { include });

const METAL_STORAGE = BuildingTech.create({
  techId: Building.METAL_STORAGE_ID,
  levelTech: {
    basicCosts: {
      metal: 2000,
    },
    baseTech: {},
  },
}, { include });

const CRYSTAL_STORAGE = BuildingTech.create({
  techId: Building.CRYSTAL_STORAGE_ID,
  levelTech: {
    basicCosts: {
      metal: 1000,
      crystal: 500,
    },
    baseTech: {},
  },
}, { include });

const DEUTERIUM_TANK = BuildingTech.create({
  techId: Building.DEUTERIUM_TANK_ID,
  levelTech: {
    basicCosts: {
      metal: 1000,
      crystal: 1000,
    },
    baseTech: {},
  },
}, { include });

const RESEARCH_LAB = BuildingTech.create({
  techId: Building.RESEARCH_LAB_ID,
  levelTech: {
    basicCosts: {
      metal: 200,
      crystal: 400,
      deuterium: 200,
    },
    baseTech: {},
  },
}, { include });

const TERRAFORMER = BuildingTech.create({
  techId: Building.TERRAFORMER_ID,
  levelTech: {
    basicCosts: {
      crystal: 50000,
      deuterium: 10 ** 5,
      energy: 1000,
    },
    baseTech: {},
  },
  canDismantle: false,
}, { include });

const ALLIANCE_DEPOT = BuildingTech.create({
  techId: Building.ALLIANCE_DEPOT_ID,
  levelTech: {
    basicCosts: {
      metal: 20000,
      crystal: 40000,
    },
    baseTech: {},
  },
}, { include });

const SPACE_DOCK = BuildingTech.create({
  techId: Building.SPACE_DOCK_ID,
  levelTech: {
    basicCosts: {
      metal: 200,
      deuterium: 50,
      energy: 100,
    },
    baseTech: {},
    // TODO factor?
  },
}, { include });

const LUNAR_BASE = BuildingTech.create({
  techId: Building.LUNAR_BASE_ID,
  levelTech: {
    basicCosts: {
      metal: 20000,
      crystal: 40000,
      deuterium: 20000,
    },
    baseTech: {},
  },
}, { include });

const SENSOR_PHALANX = BuildingTech.create({
  techId: Building.SENSOR_PHALANX_ID,
  levelTech: {
    basicCosts: {
      metal: 20000,
      crystal: 40000,
      deuterium: 20000,
    },
    baseTech: {},
  },
}, { include });

const JUMP_GATE = BuildingTech.create({
  techId: Building.JUMP_GATE_ID,
  levelTech: {
    basicCosts: {
      metal: 2 * 10 ** 6,
      crystal: 4 * 10 ** 6,
      deuterium: 2 * 10 ** 6,
    },
    baseTech: {},
  },
}, { include });

const MISSILE_SILO = BuildingTech.create({
  techId: Building.MISSILE_SILO_ID,
  levelTech: {
    basicCosts: {
      metal: 20000,
      crystal: 20000,
      deuterium: 1000,
    },
    baseTech: {},
  },
}, { include });


export default Promise.all([
  META_MINE,
  CRYSTAL_MINE,
  DEUTERIUM_SYNTHESIZER,
  SOLAR_PLANT,
  FUSION_REACTOR,
  ROBOTICS_FACTORY,
  NANITE_FACTORY,
  SHIPYARD,
  METAL_STORAGE,
  CRYSTAL_STORAGE,
  DEUTERIUM_TANK,
  RESEARCH_LAB,
  TERRAFORMER,
  ALLIANCE_DEPOT,
  SPACE_DOCK,
  LUNAR_BASE,
  SENSOR_PHALANX,
  JUMP_GATE,
  MISSILE_SILO,
]).then((values) => ({
  // TODO code this better. like python itertools.zip()
  META_MINE: values[0],
  CRYSTAL_MINE: values[1],
  DEUTERIUM_SYNTHESIZER: values[2],
  SOLAR_PLANT: values[3],
  FUSION_REACTOR: values[4],
  ROBOTICS_FACTORY: values[5],
  NANITE_FACTORY: values[6],
  SHIPYARD: values[7],
  METAL_STORAGE: values[8],
  CRYSTAL_STORAGE: values[9],
  DEUTERIUM_TANK: values[10],
  RESEARCH_LAB: values[11],
  TERRAFORMER: values[12],
  ALLIANCE_DEPOT: values[13],
  SPACE_DOCK: values[14],
  LUNAR_BASE: values[15],
  SENSOR_PHALANX: values[16],
  JUMP_GATE: values[17],
  MISSILE_SILO: values[18],
}));
