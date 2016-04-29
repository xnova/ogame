/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import BaseTech from './BaseTech';
import Building from './Building';
import BuildingTech from './BuildingTech';
import Coordinates from './Coordinates';
import Defense from './Defense';
import DefenseTech from './DefenseTech';
import LevelTech from './LevelTech';
import Planet from './Planet';
import RapidFire from './RapidFire';
import Requirement from './Requirement';
import Resources from './Resources';
import Ship from './Ship';
import ShipTech from './ShipTech';
import Technology from './Technology';
import TechnologyTech from './TechnologyTech';
import UnitTech from './UnitTech';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

LevelTech.belongsToMany(BaseTech, {
  as: 'application',
  through: Requirement,
  foreignKey: 'requirementId',
});
BaseTech.belongsToMany(LevelTech, {
  as: 'requirement',
  through: Requirement,
  foreignKey: 'applicationId',
});

// TODO chapuza
Building.belongsTo(BuildingTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

BuildingTech.belongsToMany(Planet, { through: Building, foreignKey: 'techId' });
Planet.belongsToMany(BuildingTech, { as: 'buildings', through: Building });

BuildingTech.hasOne(LevelTech, {
  foreignKey: 'techId',
  as: 'levelTech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

// TODO chapuza
Defense.belongsTo(DefenseTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

DefenseTech.belongsToMany(Planet, { through: Defense, foreignKey: 'techId' });
Planet.belongsToMany(DefenseTech, { as: 'defenses', through: Defense });

DefenseTech.hasOne(UnitTech, {
  foreignKey: 'techId',
  as: 'unit',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

LevelTech.belongsTo(Resources, {
  foreignKey: 'basicCostsId',
  as: 'basicCosts',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

LevelTech.hasOne(BaseTech, {
  foreignKey: 'techId',
  as: 'baseTech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

// TODO chapuza
Ship.belongsTo(ShipTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

ShipTech.belongsToMany(Planet, { through: Ship, foreignKey: 'techId' });
Planet.belongsToMany(ShipTech, { as: 'ships', through: Ship });

ShipTech.hasOne(UnitTech, {
  foreignKey: 'techId',
  as: 'unit',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

UnitTech.belongsToMany(ShipTech, { through: RapidFire, foreignKey: 'againstId' });
ShipTech.belongsToMany(UnitTech, { as: 'rapidFire', through: RapidFire, foreignKey: 'fromId' });

// TODO chapuza
Technology.belongsTo(TechnologyTech, {
  foreignKey: 'techId',
  as: 'Tech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

TechnologyTech.belongsToMany(User, { through: Technology, foreignKey: 'techId' });
User.belongsToMany(TechnologyTech, { as: 'technologies', through: Technology });

TechnologyTech.hasOne(LevelTech, {
  foreignKey: 'techId',
  as: 'levelTech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

UnitTech.belongsTo(Resources, {
  foreignKey: 'costsId',
  as: 'costs',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

UnitTech.hasOne(BaseTech, {
  foreignKey: 'techId',
  as: 'baseTech',
  onUpdate: 'cascade', // TODO check
  onDelete: 'cascade', // TODO check
});

User.hasMany(Coordinates);

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  // FIXME Sequelize.sync({ force: true }) is too dangerous to live.
  // https://github.com/sequelize/sequelize/issues/2670
  return sequelize.sync({ force: true, ...args }).then(async () => {
    /*
     * Buildings
     */
    let include = [
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
    BuildingTech.create({
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
    BuildingTech.create({
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
    BuildingTech.create({
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
    BuildingTech.create({
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
    BuildingTech.create({
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
    const ROBOTICS_FACTORY = await BuildingTech.create({
      techId: Building.ROBOTICS_FACTORY_ID,
      levelTech: {
        basicCosts: {
          metal: 400,
          crystal: 120,
          deuterium: 200,
        },
        baseTech: { name: 'caca' },
      },
    }, { include });
    const NANITE_FACTORY = await BuildingTech.create({
      techId: Building.NANITE_FACTORY_ID,
      levelTech: {
        basicCosts: {
          metal: 10 ** 6,
          crystal: 500000,
          deuterium: 10 ** 5,
        },
        baseTech: { name: 'caca' },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.SHIPYARD_ID,
      levelTech: {
        basicCosts: {
          metal: 400,
          crystal: 200,
          deuterium: 100,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.METAL_STORAGE_ID,
      levelTech: {
        basicCosts: {
          metal: 2000,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.CRYSTAL_STORAGE_ID,
      levelTech: {
        basicCosts: {
          metal: 1000,
          crystal: 500,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.DEUTERIUM_TANK_ID,
      levelTech: {
        basicCosts: {
          metal: 1000,
          crystal: 1000,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.RESEARCH_LAB_ID,
      levelTech: {
        basicCosts: {
          metal: 200,
          crystal: 400,
          deuterium: 200,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.TERRAFORMER_ID,
      levelTech: {
        basicCosts: {
          crystal: 50000,
          deuterium: 10 ** 5,
          energy: 1000,
        },
      },
      canDismantle: false,
    }, { include });
    BuildingTech.create({
      techId: Building.ALLIANCE_DEPOT_ID,
      levelTech: {
        basicCosts: {
          metal: 20000,
          crystal: 40000,
        },
      },
    }, { include });
    BuildingTech.create({
      techId: Building.MISSILE_SILO_ID,
      levelTech: {
        basicCosts: {
          metal: 20000,
          crystal: 20000,
          deuterium: 1000,
        },
      },
    }, { include });

    /*
     * Technologies
     */
    TechnologyTech.create({
      techId: Technology.ENERGY_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 800,
          crystal: 400,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.LASER_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 200,
          crystal: 100,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.ION_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 1000,
          crystal: 300,
          deuterium: 100,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.HYPERSPACE_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 4000,
          crystal: 2000,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.PLASMA_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 2000,
          crystal: 4000,
          deuterium: 1000,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.COMBUSTION_DRIVE_ID,
      levelTech: {
        basicCosts: {
          metal: 400,
          crystal: 600,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.IMPULSE_DRIVE_ID,
      levelTech: {
        basicCosts: {
          metal: 2000,
          crystal: 4000,
          deuterium: 600,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.HYPERSPACE_DRIVE_ID,
      levelTech: {
        basicCosts: {
          metal: 10000,
          crystal: 20000,
          deuterium: 6000,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.ESPIONAGE_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 200,
          crystal: 1000,
          deuterium: 200,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.COMPUTER_TECH_ID,
      levelTech: {
        basicCosts: {
          crystal: 400,
          deuterium: 600,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.ASTROPHYSICS_ID,
      levelTech: {
        basicCosts: {
          metal: 4000,
          crystal: 8000,
          deuterium: 4000,
        },
        costFactor: 1.75,
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.INTERGALACTIC_RESEARCH_NETWORK_ID,
      levelTech: {
        basicCosts: {
          metal: 240000,
          crystal: 400000,
          deuterium: 160000,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.GRAVITON_TECH_ID,
      levelTech: {
        basicCosts: {
          energy: 300000,
        },
        costFactor: 3,
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.WEAPONS_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 800,
          crystal: 200,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.SHIELDING_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 200,
          crystal: 600,
        },
      },
    }, { include });
    TechnologyTech.create({
      techId: Technology.ARMOUR_TECH_ID,
      levelTech: {
        basicCosts: {
          metal: 1000,
        },
      },
    }, { include });

    /*
     * Ships
     */
    include = [
      { model: UnitTech, as: 'unit', include: [{ model: Resources, as: 'costs' }] },
    ];
    const SMALL_CARGO = await ShipTech.create({
      techId: Ship.SMALL_CARGO_ID,
      unit: {
        costs: {
          metal: 2000,
          crystal: 2000,
        },
        basicShield: 10,
        basicAttack: 5,
      },
      basicSpeed: 5000,
      cargoCapacity: 5000,
      fuelUsage: 10,
    }, { include });
    const LARGE_CARGO = await ShipTech.create({
      techId: Ship.LARGE_CARGO_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 6000,
        },
        basicShield: 25,
        basicAttack: 5,
      },
      basicSpeed: 7500,
      cargoCapacity: 25000,
      fuelUsage: 50,
    }, { include });
    const LIGHT_FIGHTER = await ShipTech.create({
      techId: Ship.LIGHT_FIGHTER_ID,
      unit: {
        costs: {
          metal: 3000,
          crystal: 1000,
        },
        basicShield: 10,
        basicAttack: 50,
      },
      basicSpeed: 12500,
      cargoCapacity: 50,
      fuelUsage: 20,
    }, { include });
    const HEAVY_FIGHTER = await ShipTech.create({
      techId: Ship.HEAVY_FIGHTER_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 4000,
        },
        basicShield: 25,
        basicAttack: 150,
      },
      basicSpeed: 10000,
      cargoCapacity: 100,
      fuelUsage: 75,
    }, { include });
    const CRUISER = await ShipTech.create({
      techId: Ship.CRUISER_ID,
      unit: {
        costs: {
          metal: 20000,
          crystal: 7000,
          deuterium: 2000,
        },
        basicShield: 50,
        basicAttack: 400,
      },
      basicSpeed: 15000,
      cargoCapacity: 800,
      fuelUsage: 300,
    }, { include });
    const BATTLESHIP = await ShipTech.create({
      techId: Ship.BATTLESHIP_ID,
      unit: {
        costs: {
          metal: 45000,
          crystal: 15000,
        },
        basicShield: 200,
        basicAttack: 1000,
      },
      basicSpeed: 10000,
      cargoCapacity: 1500,
      fuelUsage: 500,
    }, { include });
    const COLONY_SHIP = await ShipTech.create({
      techId: Ship.COLONY_SHIP_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 20000,
          deuterium: 10000,
        },
        basicShield: 100,
        basicAttack: 50,
      },
      basicSpeed: 2500,
      cargoCapacity: 7500,
      fuelUsage: 1000,
    }, { include });
    const RECYCLER = await ShipTech.create({
      techId: Ship.RECYCLER_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 6000,
          deuterium: 2000,
        },
        basicShield: 10,
        basicAttack: 1,
      },
      basicSpeed: 2000,
      cargoCapacity: 20000,
      fuelUsage: 300,
    }, { include });
    const ESPIONAGE_PROBE = await ShipTech.create({
      techId: Ship.ESPIONAGE_PROBE_ID,
      unit: {
        costs: {
          crystal: 1000,
        },
        basicShield: 0.01,
        basicAttack: 0.01,
      },
      basicSpeed: 10 ** 8,
      cargoCapacity: 0,
      fuelUsage: 1,
    }, { include });
    const BOMBER = await ShipTech.create({
      techId: Ship.BOMBER_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 25000,
          deuterium: 15000,
        },
        basicShield: 500,
        basicAttack: 1000,
      },
      basicSpeed: 4000,
      cargoCapacity: 500,
      fuelUsage: 1000,
    }, { include });
    const SOLAR_SATELLITE = await ShipTech.create({
      techId: Ship.SOLAR_SATELLITE_ID,
      unit: {
        costs: {
          crystal: 2000,
          deuterium: 500,
        },
        basicShield: 1,
        basicAttack: 1,
      },
      basicSpeed: 0,
      cargoCapacity: 0,
      fuelUsage: 0,
    }, { include });
    const DESTROYER = await ShipTech.create({
      techId: Ship.DESTROYER_ID,
      unit: {
        costs: {
          metal: 60000,
          crystal: 50000,
          deuterium: 15000,
        },
        basicShield: 500,
        basicAttack: 2000,
      },
      basicSpeed: 5000,
      cargoCapacity: 2000,
      fuelUsage: 1000,
    }, { include });
    const DEATH_STAR = await ShipTech.create({
      techId: Ship.DEATH_STAR_ID,
      unit: {
        costs: {
          metal: 5000000,
          crystal: 4000000,
          deuterium: 1000000,
        },
        basicShield: 50000,
        basicAttack: 200000,
      },
      basicSpeed: 100,
      cargoCapacity: 1000000,
      fuelUsage: 1,
    }, { include });
    const BATTLE_CRUISER = await ShipTech.create({
      techId: Ship.BATTLE_CRUISER_ID,
      unit: {
        costs: {
          metal: 30000,
          crystal: 40000,
          deuterium: 15000,
        },
        basicShield: 400,
        basicAttack: 700,
      },
      basicSpeed: 10000,
      cargoCapacity: 750,
      fuelUsage: 250,
    }, { include });

    /*
     * Defenses
     */
    const ROCKET_LAUNCHER = await DefenseTech.create({
      techId: Defense.ROCKET_LAUNCHER_ID,
      unit: {
        costs: {
          metal: 2000,
        },
        basicShield: 20,
        basicAttack: 80,
      },
    }, { include });
    const LIGHT_LASER = await DefenseTech.create({
      techId: Defense.LIGHT_LASER_ID,
      unit: {
        costs: {
          metal: 1500,
          crystal: 500,
        },
        basicShield: 25,
        basicAttack: 100,
      },
    }, { include });
    const HEAVY_LASER = await DefenseTech.create({
      techId: Defense.HEAVY_LASER_ID,
      unit: {
        costs: {
          metal: 6000,
          crystal: 2000,
        },
        basicShield: 100,
        basicAttack: 250,
      },
    }, { include });
    const GAUSS_CANNON = await DefenseTech.create({
      techId: Defense.GAUSS_CANNON_ID,
      unit: {
        costs: {
          metal: 20000,
          crystal: 15000,
          deuterium: 2000,
        },
        basicShield: 200,
        basicAttack: 1100,
      },
    }, { include });
    const ION_CANNON = await DefenseTech.create({
      techId: Defense.ION_CANNON_ID,
      unit: {
        costs: {
          metal: 2000,
          crystal: 6000,
        },
        basicShield: 500,
        basicAttack: 150,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.PLASMA_TURRET_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 50000,
          deuterium: 30000,
        },
        basicShield: 300,
        basicAttack: 3000,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.SMALL_SHIELD_DOME_ID,
      unit: {
        costs: {
          metal: 10000,
          crystal: 10000,
        },
        basicShield: 2000,
        basicAttack: 1,
        maxQuantity: 1,
      },
    }, { include });
    DefenseTech.create({
      techId: Defense.LARGE_SHIELD_DOME_ID,
      unit: {
        costs: {
          metal: 50000,
          crystal: 50000,
        },
        basicShield: 10000,
        basicAttack: 1,
        maxQuantity: 1,
      },
    }, { include });

    /*
     * Requirements
     */

    NANITE_FACTORY.addRequirement(ROBOTICS_FACTORY, { level: 10 });


    /*
     * RapidFire
     */
    SMALL_CARGO.addRapidFire(ESPIONAGE_PROBE.techId);
    SMALL_CARGO.addRapidFire(SOLAR_SATELLITE.techId);

    LARGE_CARGO.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    LARGE_CARGO.addRapidFire(Ship.SOLAR_SATELLITE_ID);

    LIGHT_FIGHTER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    LIGHT_FIGHTER.addRapidFire(Ship.SOLAR_SATELLITE_ID);

    HEAVY_FIGHTER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    HEAVY_FIGHTER.addRapidFire(Ship.SOLAR_SATELLITE_ID);
    HEAVY_FIGHTER.addRapidFire(Ship.SMALL_CARGO_ID, { value: 3 });

    CRUISER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    CRUISER.addRapidFire(Ship.SOLAR_SATELLITE_ID);
    CRUISER.addRapidFire(Ship.LIGHT_FIGHTER_ID, { value: 6 });
    CRUISER.addRapidFire(Defense.ROCKET_LAUNCHER_ID, { value: 10 });

    BATTLESHIP.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    BATTLESHIP.addRapidFire(Ship.SOLAR_SATELLITE_ID);

    COLONY_SHIP.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    COLONY_SHIP.addRapidFire(Ship.SOLAR_SATELLITE_ID);

    RECYCLER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    RECYCLER.addRapidFire(Ship.SOLAR_SATELLITE_ID);

    BOMBER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    BOMBER.addRapidFire(Ship.SOLAR_SATELLITE_ID);
    BOMBER.addRapidFire(Defense.ROCKET_LAUNCHER_ID, { value: 20 });
    BOMBER.addRapidFire(Defense.LIGHT_LASER_ID, { value: 20 });
    BOMBER.addRapidFire(Defense.HEAVY_LASER_ID, { value: 10 });
    BOMBER.addRapidFire(Defense.ION_CANNON_ID, { value: 10 });

    DESTROYER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    DESTROYER.addRapidFire(Ship.SOLAR_SATELLITE_ID);
    DESTROYER.addRapidFire(Defense.LIGHT_LASER_ID, { value: 10 });
    DESTROYER.addRapidFire(Ship.BATTLE_CRUISER_ID, { value: 2 });

    DEATH_STAR.addRapidFire(Ship.SMALL_CARGO_ID, { value: 250 });
    DEATH_STAR.addRapidFire(Ship.LARGE_CARGO_ID, { value: 250 });
    DEATH_STAR.addRapidFire(Ship.LIGHT_FIGHTER_ID, { value: 200 });
    DEATH_STAR.addRapidFire(Ship.HEAVY_FIGHTER_ID, { value: 100 });
    DEATH_STAR.addRapidFire(Ship.CRUISER_ID, { value: 33 });
    DEATH_STAR.addRapidFire(Ship.BATTLESHIP_ID, { value: 30 });
    DEATH_STAR.addRapidFire(Ship.COLONY_SHIP_ID, { value: 250 });
    DEATH_STAR.addRapidFire(Ship.RECYCLER_ID, { value: 250 });
    DEATH_STAR.addRapidFire(Ship.ESPIONAGE_PROBE_ID, { value: 1250 });
    DEATH_STAR.addRapidFire(Ship.SOLAR_SATELLITE_ID, { value: 1250 });
    DEATH_STAR.addRapidFire(Ship.BOMBER_ID, { value: 25 });
    DEATH_STAR.addRapidFire(Ship.DESTROYER_ID, { value: 5 });
    DEATH_STAR.addRapidFire(Defense.ROCKET_LAUNCHER_ID, { value: 200 });
    DEATH_STAR.addRapidFire(LIGHT_LASER.techId, { value: 200 });
    DEATH_STAR.addRapidFire(HEAVY_LASER.techId, { value: 100 });
    DEATH_STAR.addRapidFire(GAUSS_CANNON.techId, { value: 50 });
    DEATH_STAR.addRapidFire(ION_CANNON.techId, { value: 100 });
    DEATH_STAR.addRapidFire(Ship.BATTLE_CRUISER_ID, { value: 15 });

    BATTLE_CRUISER.addRapidFire(Ship.ESPIONAGE_PROBE_ID);
    BATTLE_CRUISER.addRapidFire(Ship.SOLAR_SATELLITE_ID);
    BATTLE_CRUISER.addRapidFire(Ship.SMALL_CARGO_ID, { value: 3 });
    BATTLE_CRUISER.addRapidFire(Ship.LARGE_CARGO_ID, { value: 3 });
    BATTLE_CRUISER.addRapidFire(Ship.HEAVY_FIGHTER_ID, { value: 4 });
    BATTLE_CRUISER.addRapidFire(Ship.CRUISER_ID, { value: 4 });
    BATTLE_CRUISER.addRapidFire(Ship.BATTLESHIP_ID, { value: 7 });

    /*
     * arkeros
     */
    const hyperion = await Planet.create({
      name: 'Hyperion',
      diameter: 12800,
    });
    hyperion.addShip(SMALL_CARGO, { quantity: 4400 });
    hyperion.addShip(LARGE_CARGO, { quantity: 299 });
    hyperion.addShip(DEATH_STAR, { quantity: 2 });
    hyperion.addDefense(ROCKET_LAUNCHER, { quantity: 300000 });
  });
}

export default { sync };
export { Building, Defense, Ship, Technology, User, UserLogin, UserClaim, UserProfile };
