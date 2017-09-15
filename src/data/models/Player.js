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
import Planet from './Planet';
import { createHomePlanet } from './Planet';


function Player(name: string) {
  this.name = name;
  // keys
  key = `player:${name}`;
  this.key = key;
  this.homePlanetKey = `${key}:homePlanet`;
  this.planetsKey = `${key}:planets`;
  this.technologiestKey = `${key}:technologies`;
}
Player.prototype = {
  ...PlayerCore.prototype,

  /**
   * http://ogame.wikia.com/wiki/Home_Planet
   */
  async getHomePlanet(): Promise<Planet> {
    // TODO remember this result, since doesnt change much
    const planetId = await redis.getAsync(this.homePlanetKey);
    return new Planet(planetId, this);
  },

  async getTechnology(key: string): Promise<Technology> {

  },

};

export async function createPlayer(name) {
  const player = new Player(name);
  const exists = await redis.existsAsync(player.key);
  if (exists) throw new Error(`${player.key} already exists`);

  const homePlanet = await createHomePlanet(player);
  await redis.setAsync(player.homePlanetKey, planet.id);
}

export default Player;
