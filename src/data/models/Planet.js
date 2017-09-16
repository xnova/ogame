/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * Xnova OGame is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Xnova OGame is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Xnova OGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @flow
 */

import gaussian from 'gaussian';

import redis from '../redis';
import {
  constructionQueue,
} from '../queues';
import PlanetCore, { diameterToFields } from '../../core/game/Planet';
import { factoryBuilding } from '../../core/game/buildings';
import { randomInt } from '../../utils/random';
import {
  HOMEPLANET_DIAMETER,
  CONSTRUCTION_SPEED,
} from '../../config';


const NAME_KEY = 'name';
const DIAMETER_KEY = 'diameter';
const TEMPERATURE_KEY = 'temp';
const FIELDS_KEY = 'fields';
const USED_FIELDS_KEY = 'usedFields';
function Planet(id: string, player: Player) {
  // PlanetCore.call ...
  this.id = id;
  this.player = player;
  this.coordinates = id.split(':').map(str => parseInt(str, 10));
  // keys
  const key = `planet:${id}`;
  this.key = key;
  this.buildingsKey = `${key}:buildings`;
  this.shipsKey = `${key}:ships`;
  this.defensesKey = `${key}:defenses`;
}
Planet.prototype = {
  ...PlanetCore.prototype,

  /**
   * http://ogame.wikia.com/wiki/Home_Planet
   */
  async isHomePlanet(): Promise<Planet> {
    const homePlanet = await this.player.getHomePlanet();
    return this.id === homePlanet.id;
  },

  async getName(): Promise<string> {
    const name = await redis.hgetAsync(this.key, NAME_KEY);
    if (name && name.length > 0) return name;
    return this.getDefaultName();
  },

  setName(name: string): Promise {
    return redis.hsetAsync(this.key, NAME_KEY, name);
  },

  /**
   * http://ogame.wikia.com/wiki/Diameter
   */
  async getDiameter(): Promise<number> {
    return await redis.hgetAsync(this.key, DIAMETER_KEY);
  },

  async getTemperature(): Promise<number> {
    return await redis.hgetAsync(this.key, TEMPERATURE_KEY);
  },

  async getFields(): Promise<number> {
    return await redis.hgetAsync(this.key, FIELDS_KEY);
  },

  async getUsedFields(): Promise<number> {
    return await redis.hgetAsync(this.key, USED_FIELDS_KEY);
  },

  async getBuildingLevel(buildingId: string): Promise<number> {
    const level = await redis.hget(this.buildingsKey, buildingId) | 0;
    return parseInt(level, 10);
  },

  async getBuildings(): Promise<Array<Building>> {
    const buildingLevels = await redis.hgetallAsync(this.buildingsKey);
    if (!buildingLevels) return [];
    const buildings = [];
    for (const [buildingId, level] of Object.entries(buildingLevels)) {
      buildings.push(factoryBuilding(buildingId, parseInt(level, 10)));
    }
    return buildings;
  },

  incrBuildingLevel(buildingId: string, by=1): Promise {
    return redis.hincrbyAsync(this.buildingsKey, buildingId, by);
  },

  decrBuildingLevel(buildingId: string, by=1): Promise {
    return this.incrBuildingLevel(buildingId, -by);
  },

  async getShipAmount(shipId: string): Promise<number> {
    const amount = await redis.hget(this.shipsKey, shipId) | 0;
    return amount;
  },

  async getDefenseAmount(defenseId: string): Promise<number> {
    const amount = await redis.hget(this.defensesKey, defenseId) | 0;
    return amount;
  },

  async improveBuilding(buildingId: string, delta=1) {
    const currentLevel = await this.getBuildingLevel(buildingId);
    const nextLevel = currentLevel + delta;
    if (nextLevel < 0) throw new Error('Buildings at level 0 cannot be demolished!');
    const building = factoryBuilding(buildingId, nextLevel);
    const buildingSpeed = await this.getBuildingSpeed();
    const duration = building.getDuration(CONSTRUCTION_SPEED * buildingSpeed);
    console.log('duration in ms', duration.asMilliseconds());
    // TODO transaction
    const job = await constructionQueue.add(
      {
        buildingId,
        isDemolition: false,
      },
      {
        jobId: this.key,
        delay: duration.asMilliseconds(),
        removeOnComplete: true,
      },
    );
    // TODO remove cost resources
  },

  async demolishBuildin(buildingId: string) {
    return this.improveBuilding(buildingId, -1);
  },

};

const minTemp = [200, 150, 100, 50, 40, 30, 20, 10, 0, -10, -20, -30, -70, -110, -150];
function generateTemperature(slot: number): number {
  const min = minTemp[slot - 1];
  const max = min + 40;
  return randomInt(min, max);
}

// TODO
const diameterDistribution = gaussian(HOMEPLANET_DIAMETER, 5000**2);
export async function createPlanet(id: string, player): Promise<Planet> {
  const planet = new Planet(id, player);
  const slot = planet.coordinates[2];
  // TODO
  const temperature = generateTemperature(slot);
  const diameter = diameterDistribution.ppf(Math.random()) | 0;
  const fields = diameterToFields(diameter);
  const usedFields = 0;

  await Promise.all([
    redis.hmsetAsync(planet.key,
      TEMPERATURE_KEY, temperature,
      DIAMETER_KEY, diameter,
      FIELDS_KEY, fields,
      USED_FIELDS_KEY, usedFields,
    ),
    // clear old buildings, ships & defenses
    redis.delAsync(planet.buildingsKey),
    redis.delAsync(planet.shipsKey),
    redis.delAsync(planet.defensesKey),
  ]);

  return planet;
}

/**
 * http://ogame.wikia.com/wiki/Home_Planet
 * @param {*} player
 */
export async function createHomePlanet(player): Promise<Planet> {
  // TODO get next available id!
  const planetId = '1:1:1';
  const planet = await createPlanet(planetId, player);

  const diameter = HOMEPLANET_DIAMETER;
  const fields = diameterToFields(diameter);

  // overwrite daiemter & fields
  await redis.hmsetAsync(planet.key,
    DIAMETER_KEY, diameter,
    FIELDS_KEY, fields,
  );

  return planet;
}

export default Planet;
