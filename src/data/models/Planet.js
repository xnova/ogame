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

import { HashMap, del } from '../redis';
import { constructionQueue } from '../queues';
import PlanetCore, { diameterToFields } from '../../core/game/Planet';
import { factoryBuilding } from '../../core/game/buildings';
import Producer from './Producer';
import Buildings from './Buildings';
import Ships from './Ships';
import Defenses from './Defenses';
import { randomInt } from '../../utils/random';
import { HOMEPLANET_DIAMETER, CONSTRUCTION_SPEED } from '../../config';

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
  this.map = new HashMap(key);
  this.buildings = new Buildings(key);
  this.ships = new Ships(key);
  this.defenses = new Defenses(key);
  Producer.call(this, key);
}
Planet.prototype = {
  ...PlanetCore.prototype,
  ...Producer.prototype,

  equals(other: Planet): boolean {
    return this.id === other.id;
  },

  getName(): Promise<string> {
    return this.map.get(NAME_KEY);
  },

  setName(name: string): Promise {
    return this.map.set(NAME_KEY, name);
  },

  /**
   * http://ogame.wikia.com/wiki/Diameter
   */
  getDiameter(): Promise<number> {
    return this.map.get(DIAMETER_KEY);
  },

  getTemperature(): Promise<number> {
    return this.map.get(TEMPERATURE_KEY);
  },

  // TODO would be better dynamic?
  getFields(): Promise<number> {
    return this.map.get(FIELDS_KEY);
  },

  getUsedFields(): Promise<number> {
    return this.map.get(USED_FIELDS_KEY);
  },

  async improveBuilding(buildingId: string, isDemolition = false) {
    const currentLevel = await this.getBuildingLevel(buildingId);
    const delta = isDemolition ? -1 : 1;
    const nextLevel = currentLevel + delta;
    // console.log(currentLevel, nextLevel);
    if (nextLevel < 0)
      throw new Error('Buildings at level 0 cannot be demolished!');
    // TODO check requirements
    const building = factoryBuilding(buildingId, nextLevel);
    const buildingSpeed = await this.getBuildingSpeed();
    const duration = building.getDuration(CONSTRUCTION_SPEED * buildingSpeed);
    // console.log('duration in ms', duration.asMilliseconds());
    // TODO transaction
    const job = await constructionQueue.add(
      {
        buildingId,
        isDemolition,
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
    return this.improveBuilding(buildingId, true);
  },

  async getConstruction(): Promise<Construction> {
    const job = await constructionQueue.getJob(this.key);
    if (job) {
      // console.log(job);
      return {
        ...job.data,
        // dividing by 1000 to get seconds
        // timestamp is when it was started
        timestamp: Math.ceil(job.timestamp / 1000),
        duration: Math.ceil(job.delay / 1000),
      };
    }

    return null;
  },

  async cancelConstruction() {
    const job = await constructionQueue.getJob(this.key);
    if (job) {
      // TODO restore resources
      await job.remove();
    }
  },
};

const minTemp = [
  200,
  150,
  100,
  50,
  40,
  30,
  20,
  10,
  0,
  -10,
  -20,
  -30,
  -70,
  -110,
  -150,
];
function generateTemperature(slot: number): number {
  const min = minTemp[slot - 1];
  const max = min + 40;
  return randomInt(min, max);
}

// TODO
const diameterDistribution = gaussian(HOMEPLANET_DIAMETER, 5000 ** 2);
export async function createPlanet(id: string, player): Promise<Planet> {
  const planet = new Planet(id, player);
  const slot = planet.coordinates[2];
  const temperature = generateTemperature(slot);
  // TODO generate diameters like wikia! different for each slot
  const diameter = diameterDistribution.ppf(Math.random()) | 0;
  const fields = diameterToFields(diameter);
  const usedFields = 0;

  const now = Date.now();

  await Promise.all([
    planet.map.update({
      [TEMPERATURE_KEY]: temperature,
      [DIAMETER_KEY]: diameter,
      [FIELDS_KEY]: fields,
      [USED_FIELDS_KEY]: usedFields,
    }),
    // TODO defaults on config!
    planet.resources.update({
      metal: 500,
      crystal: 500,
      deuterium: 0,
      lastUpdate: now,
    }),
    // clear old buildings, ships & defenses
    del(planet.buildings.key),
    del(planet.ships.key),
    del(planet.defenses.key),
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
  const planet: Planet = await createPlanet(planetId, player);

  const diameter = HOMEPLANET_DIAMETER;
  const fields = diameterToFields(diameter);

  // overwrite daiemter & fields
  await planet.map.update({
    [DIAMETER_KEY]: diameter,
    [FIELDS_KEY]: fields,
  });

  return planet;
}

export default Planet;
