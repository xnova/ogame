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

import { Counter } from '../redis';
import { MINUTE, HOUR } from '../../core/constants';

// TODO make it different for each planet§
const production = [1800, 360, 60];

function Producer(key: string) {
  this.resources = new Counter(`${key}:resources`);
}
Producer.prototype = {

  async updateResources(force = false) {
    await this.fetchResources(force);

    const { lastUpdate, metal, crystal, deuterium } = this.resourcesCache;
    const now = Date.now();
    const elapsed = now - lastUpdate;
    const produced = production.map(x => x * (elapsed / HOUR));
    this.resourcesCache = {
      metal: metal + produced[0],
      crystal: crystal + produced[1],
      deuterium: deuterium + produced[2],
      lastUpdate: now,
    };
    // console.log('resources', this.resources);
    // only save if db record is old enough
    if (force || elapsed > MINUTE) {
      // use increment is better because they are 'atomic'
      await Promise.all([
        this.resources.addByFloat({
          metal: produced[0],
          crystal: produced[1],
          deuterium: produced[2],
        }),
        this.resources.incr('lastUpdate', elapsed),
      ]);
    }
  },

  async fetchResources(force = false) {
    if (!force && this.resourcesCache) return;
    const {
      metal,
      crystal,
      deuterium,
      lastUpdate,
    } = await this.resources.getAll();
    this.resourcesCache = {
      metal: parseFloat(metal),
      crystal: parseFloat(crystal),
      deuterium: parseFloat(deuterium),
      lastUpdate: parseInt(lastUpdate, 10),
    };
    // console.log('fetched resources', this.resources);
  },

  async getResources() {
    await this.updateResources();
    return this.resourcesCache;
  },

};

export default Producer;
