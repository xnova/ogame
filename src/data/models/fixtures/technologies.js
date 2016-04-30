import Promise from 'bluebird';

import BaseTech from '../BaseTech';
import LevelTech from '../LevelTech';
import Resources from '../Resources';
import Technology from '../Technology';
import TechnologyTech from '../TechnologyTech';

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


const ENERGY_TECH = TechnologyTech.create({
  techId: Technology.ENERGY_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 800,
      crystal: 400,
    },
    baseTech: {},
  },
}, { include });

const LASER_TECH = TechnologyTech.create({
  techId: Technology.LASER_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 200,
      crystal: 100,
    },
    baseTech: {},
  },
}, { include });

const ION_TECH = TechnologyTech.create({
  techId: Technology.ION_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 1000,
      crystal: 300,
      deuterium: 100,
    },
    baseTech: {},
  },
}, { include });

const HYPERSPACE_TECH = TechnologyTech.create({
  techId: Technology.HYPERSPACE_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 4000,
      crystal: 2000,
    },
    baseTech: {},
  },
}, { include });

const PLASMA_TECH = TechnologyTech.create({
  techId: Technology.PLASMA_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 2000,
      crystal: 4000,
      deuterium: 1000,
    },
    baseTech: {},
  },
}, { include });

const COMBUSTION_DRIVE = TechnologyTech.create({
  techId: Technology.COMBUSTION_DRIVE_ID,
  levelTech: {
    basicCosts: {
      metal: 400,
      crystal: 600,
    },
    baseTech: {},
  },
}, { include });

const IMPULSE_DRIVE = TechnologyTech.create({
  techId: Technology.IMPULSE_DRIVE_ID,
  levelTech: {
    basicCosts: {
      metal: 2000,
      crystal: 4000,
      deuterium: 600,
    },
    baseTech: {},
  },
}, { include });

const HYPERSPACE_DRIVE = TechnologyTech.create({
  techId: Technology.HYPERSPACE_DRIVE_ID,
  levelTech: {
    basicCosts: {
      metal: 10000,
      crystal: 20000,
      deuterium: 6000,
    },
    baseTech: {},
  },
}, { include });

const ESPIONAGE_TECH = TechnologyTech.create({
  techId: Technology.ESPIONAGE_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 200,
      crystal: 1000,
      deuterium: 200,
    },
    baseTech: {},
  },
}, { include });

const COMPUTER_TECH = TechnologyTech.create({
  techId: Technology.COMPUTER_TECH_ID,
  levelTech: {
    basicCosts: {
      crystal: 400,
      deuterium: 600,
    },
    baseTech: {},
  },
}, { include });

const ASTROPHYSICS = TechnologyTech.create({
  techId: Technology.ASTROPHYSICS_ID,
  levelTech: {
    basicCosts: {
      metal: 4000,
      crystal: 8000,
      deuterium: 4000,
    },
    baseTech: {},
    costFactor: 1.75,
  },
}, { include });

const INTERGALACTIC_RESEARCH_NETWORK = TechnologyTech.create({
  techId: Technology.INTERGALACTIC_RESEARCH_NETWORK_ID,
  levelTech: {
    basicCosts: {
      metal: 240000,
      crystal: 400000,
      deuterium: 160000,
    },
    baseTech: {},
  },
}, { include });

const GRAVITON_TECH = TechnologyTech.create({
  techId: Technology.GRAVITON_TECH_ID,
  levelTech: {
    basicCosts: {
      energy: 300000,
    },
    baseTech: {},
    costFactor: 3,
  },
}, { include });

const WEAPONS_TECH = TechnologyTech.create({
  techId: Technology.WEAPONS_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 800,
      crystal: 200,
    },
    baseTech: {},
  },
}, { include });

const SHIELDING_TECH = TechnologyTech.create({
  techId: Technology.SHIELDING_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 200,
      crystal: 600,
    },
    baseTech: {},
  },
}, { include });

const ARMOUR_TECH = TechnologyTech.create({
  techId: Technology.ARMOUR_TECH_ID,
  levelTech: {
    basicCosts: {
      metal: 1000,
    },
    baseTech: {},
  },
}, { include });


export default Promise.all([
  ENERGY_TECH,
  LASER_TECH,
  ION_TECH,
  HYPERSPACE_TECH,
  PLASMA_TECH,
  COMBUSTION_DRIVE,
  IMPULSE_DRIVE,
  HYPERSPACE_DRIVE,
  ESPIONAGE_TECH,
  COMPUTER_TECH,
  ASTROPHYSICS,
  INTERGALACTIC_RESEARCH_NETWORK,
  GRAVITON_TECH,
  WEAPONS_TECH,
  SHIELDING_TECH,
  ARMOUR_TECH,
]).then((values) => ({
  ENERGY_TECH: values[0],
  LASER_TECH: values[1],
  ION_TECH: values[2],
  HYPERSPACE_TECH: values[3],
  PLASMA_TECH: values[4],
  COMBUSTION_DRIVE: values[5],
  IMPULSE_DRIVE: values[6],
  HYPERSPACE_DRIVE: values[7],
  ESPIONAGE_TECH: values[8],
  COMPUTER_TECH: values[9],
  ASTROPHYSICS: values[10],
  INTERGALACTIC_RESEARCH_NETWORK: values[11],
  GRAVITON_TECH: values[12],
  WEAPONS_TECH: values[13],
  SHIELDING_TECH: values[14],
  ARMOUR_TECH: values[15],
}));
