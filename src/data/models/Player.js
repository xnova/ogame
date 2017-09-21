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

import { HashMap, Set, del, exists } from '../redis';
import Technologies from './Technologies';
import PlayerCore from '../../core/game/Player';
import { factoryTechnology } from '../../core/game/technologies';
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
  this.map = new HashMap(key);
  this.planets = new Set(`${key}:planets`);
  this.technologies = new Technologies(key);
}
Player.prototype = {
  ...PlayerCore.prototype,

  async createPlanet(planetId: string): Promise<Planet> {
    const planet = await createPlanet(planetId, this);
    await this.addPlanet(planet);
    return planet;
  },

  /**
   * http://ogame.wikia.com/wiki/Home_Planet
   */
  async getHomePlanet(): Promise<Planet> {
    // TODO remember this result, since doesnt change much
    const planetId = await this.map.get(HOMEPLANET_KEY);
    return new Planet(planetId, this);
  },

  async getPlanets(): Promise<Array<Planet>> {
    // TODO remember this result, since doesnt change much
    const planetsId = await this.planets.values();
    const planets = planetsId.map(planetId => new Planet(planetId, this));
    return planets;
  },

  addPlanet(planet: Planet): Promise {
    this.planets.add(planet.id);
  },

  hasPlanet(planet: Planet): Promise<boolean> {
    return this.planets.has(planet.id);
  },

};

export async function createPlayer(name): Promise<Player> {
  const player = new Player(name);
  // TODO enable again
  if (await exists(player.key)) throw new Error(`${player.key} already exists`);

  const homePlanet = await createHomePlanet(player);

  // clear olds planets
  await del(player.planetsKey);

  await Promise.all([
    // save as a homeplanet
    player.map.update({
      [HOMEPLANET_KEY]: homePlanet.id,
    }),
    player.addPlanet(homePlanet),
    // clear old technologies
    del(player.technologies.key),
  ]);

  return player;
}

export default Player;
