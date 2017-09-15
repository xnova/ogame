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

import redis from '../redis';
import PlayerCore from '../../core/game/Player';
import Planet, {
  createHomePlanet,
  createPlanet,
} from './Planet';

const HOMEPLANET_KEY = 'homePlanet';
function Player(name: string) {
  this.id = name;
  this.name = name;
  // keys
  const key = `player:${name}`;
  this.key = key;
  this.planetsKey = `${key}:planets`;
  this.technologiesKey = `${key}:technologies`;
}
Player.prototype = {
  ...PlayerCore.prototype,

  async createPlanet(planetId: string): Promise<Planet> {
    const planet = await createPlanet(planetId, this);
    await redis.saddAsync(this.planetsKey, planet.id);
    return planet;
  },

  /**
   * http://ogame.wikia.com/wiki/Home_Planet
   */
  async getHomePlanet(): Promise<Planet> {
    // TODO remember this result, since doesnt change much
    const planetId = await redis.hgetAsync(this.key, HOMEPLANET_KEY);
    return new Planet(planetId, this);
  },

  async getPlanets(): Promise<Array<Planet>> {
    // TODO remember this result, since doesnt change much
    const planetsId = await redis.smembersAsync(this.planetsKey);
    const planets = planetsId.map(planetId => new Planet(planetId, this))
    return planets;
  },

  async getTechnology(key: string): Promise<Technology> {

  },

};

export async function createPlayer(name): Promise<Player> {
  const player = new Player(name);
  const exists = await redis.existsAsync(player.key);
  // TODO enable again
  // if (exists) throw new Error(`${player.key} already exists`);

  const homePlanet = await createHomePlanet(player);
  await redis.hmsetAsync(player.key,
    HOMEPLANET_KEY, homePlanet.id,
  );

  await redis.saddAsync(player.planetsKey, homePlanet.id);

  return player;
}

export default Player;
