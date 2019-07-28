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

const name = 'Metal Mine';
const shortDesc =
  'Used in the extraction of metal ore, metal mines are of primary importance to all emerging and established empires.';
const description =
  'Metal is the primary resource used in the foundation of your Empire. At greater depths, the mines can produce more output of viable metal for use in the construction of buildings, ships, defence systems, and research. As the mines drill deeper, more energy is required for maximum production. As metal is the most abundant of all resources available, its value is considered to be the lowest of all resources for trading.';

/**
 * http://ogame.wikia.com/wiki/Metal_Mine
 * @param {*} level
 */
function MetalMine(level) {
  Building.call(this, level);
}

MetalMine.prototype = {
  ...Building.prototype,
  id: 'metalMine',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 60,
    crystal: 15,
  },
  costFactor: 1.5,
};

export default MetalMine;
