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

import { RESOURCES } from '../resources';


function Technology(level) {
  this.level = level;
}
Technology.prototype = {

  name: 'Unnamed Technology',

  shortDesc: 'No short description!',

  description: 'No description!',

  level: 0,

  baseCost: {},

  costFactor: 2,

  requirements: new Map(),

  getDescription(): string {
    return this.description;
  },

  /**
   * http://ogame.wikia.com/wiki/Building#Facilities_cost
   */
  getCost(): Resources {
    const { baseCost, level, costFactor: k } = this;
    const cost = {};
    RESOURCES.forEach((resource) => {
      const b = baseCost[resource] | 0;
      cost[resource] = b * (k ** (level - 1));
    });
    return cost;
  },

  /**
   * https://www.wolframalpha.com/input/?i=sum+b+*+k+%5E+l+from+l%3D1+to+n
   */
  getAccumulatedCost(): Resources {
    const { baseCost, level, costFactor: k } = this;
    const cost = {};
    RESOURCES.forEach((resource) => {
      const b = baseCost[resource];
      cost[resource] = (b * k * (k ** level - 1)) / (k - 1);
    });
    return cost;
  },

  getScore(): number {
    const totalCost = this.getAccumulatedCost();
    const sum = totalCost.metal + totalCost.crystal + totalCost.deuterium;
    const score = sum / 1000;
  },

}

export default Technology;
