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

import Building from './Building';

const name = 'Terraformer';
const shortDesc = 'The terraformer increases the usable surface of planets.';
const description = `With the increasing construction on planets, even the living space for the colony is becoming more and more limited. Traditional methods such as high-rise and underground construction are increasingly becoming insufficient. A small group of high-energy physicists and nano engineers eventually came to the solution: terraforming.
Making use of tremendous amounts of energy, the terraformer can make whole stretches of land or even continents arable. This building houses the production of nanites created specifically for this purpose, which ensure a consistent ground quality throughout.

Each terraformer level allows 5 fields to be cultivated. With each level, the terraformer occupies one field itself. Every 2 terraformer levels you will receive 1 bonus field.`;

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function Terraformer(level) {
  Building.call(this, level);
}

Terraformer.prototype = {
  ...Building.prototype,
  id: 'terraformer',
  name,
  shortDesc,
  description,
  baseCost: {
    crystal: 50000,
    deuterium: 100000,
    energy: 1000,
  },
  dismantlable: false,

  getExtraFields(): number {
    return Math.floor(5.5 * this.level);
  },
};

export default Terraformer;
