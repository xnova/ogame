/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Coordinates from './Coordinates';
import Defense from './Defense';
import DefenseTech from './DefenseTech';
import Planet from './Planet';
import Resources from './Resources';
import Ship from './Ship';
import ShipTech from './ShipTech';
import UnitTech from './UnitTech';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

DefenseTech.belongsToMany(Planet, { through: Defense, foreignKey: 'techId' });
Planet.belongsToMany(DefenseTech, { as: 'defenses', through: Defense });

DefenseTech.hasOne(UnitTech, {
  foreignKey: 'techId',
  as: 'unit',
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

UnitTech.belongsTo(Resources, {
  foreignKey: 'costsId',
  as: 'costs',
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
  return sequelize.sync(...args).then(async () => {
    /***************
     **** Ships ****
     ***************/
    const include = [
      { model: UnitTech, as: 'unit', include: [{ model: Resources, as: 'costs' }] },
    ];
    const SMALL_CARGO = await ShipTech.create({
      techId: ShipTech.SMALL_CARGO_ID,
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
      techId: ShipTech.LARGE_CARGO_ID,
      unit: {
        basicShield: 25,
        basicAttack: 5,
      },
      basicSpeed: 7500,
      cargoCapacity: 25000,
      fuelUsage: 50,
    }, { include });
    ShipTech.create({
      techId: ShipTech.LIGHT_FIGHTER_ID,
      unit: {
        basicShield: 10,
        basicAttack: 50,
      },
      basicSpeed: 12500,
      cargoCapacity: 50,
      fuelUsage: 20,
    }, { include });

    /****************
     *** Defenses ***
     ****************/
    DefenseTech.create({
      techId: DefenseTech.ROCKET_LAUNCHER_ID,
      unit: {
        basicShield: 20,
        basicAttack: 80,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.LIGHT_LASER_ID,
      unit: {
        basicShield: 25,
        basicAttack: 100,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.HEAVY_LASER_ID,
      unit: {
        basicShield: 100,
        basicAttack: 250,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.GAUSS_CANNON_ID,
      unit: {
        basicShield: 200,
        basicAttack: 1100,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.ION_CANNON_ID,
      unit: {
        basicShield: 500,
        basicAttack: 150,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.PLASMA_TURRET_ID,
      unit: {
        basicShield: 300,
        basicAttack: 3000,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.SMALL_SHIELD_DOME_ID,
      unit: {
        basicShield: 2000,
        basicAttack: 1,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });
    DefenseTech.create({
      techId: DefenseTech.LARGE_SHIELD_DOME_ID,
      unit: {
        basicShield: 10000,
        basicAttack: 1,
      },
    }, {
      include: [{ model: UnitTech, as: 'unit' }],
    });

    /***********
     * arkeros *
     ***********/
    const hyperion = await Planet.create({
      name: 'Hyperion',
      diameter: 12800,
    });
    hyperion.addShip(SMALL_CARGO, { quantity: 4400 });
    hyperion.addShip(LARGE_CARGO, { quantity: 299 });
  });
}

export default { sync };
export { Ship, User, UserLogin, UserClaim, UserProfile };
