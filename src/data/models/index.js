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

import requirements from './fixtures/requirements';
import rapidFires from './fixtures/rapidFires';

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
    const ships = await require('./fixtures/ships').default;
    const defenses = await require('./fixtures/defenses').default;

    rapidFires({ ships, defenses });

    const buildings = await require('./fixtures/buildings').default;
    const technologies = await require('./fixtures/technologies').default;

    requirements({ buildings, technologies, ships, defenses });

    /*
     * arkeros
     */
    const hyperion = await Planet.create({
      name: 'Hyperion',
      diameter: 12800,
    });
    const { SMALL_CARGO, LARGE_CARGO, DEATH_STAR } = ships;
    const { ROCKET_LAUNCHER } = defenses;
    hyperion.addShip(SMALL_CARGO, { quantity: 4400 });
    hyperion.addShip(LARGE_CARGO, { quantity: 299 });
    hyperion.addShip(DEATH_STAR, { quantity: 2 });
    hyperion.addDefense(ROCKET_LAUNCHER, { quantity: 300000 });
  });
}

export default { sync };
export { Building, Defense, Ship, Technology, User, UserLogin, UserClaim, UserProfile };
