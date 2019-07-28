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
import Storage from './Storage';

const name = 'Metal Storage';
const shortDesc = 'Provides storage for excess metal.';
const description =
  'This giant storage facility is used to store metal ore. Each level of upgrading increases the amount of metal ore that can be stored. If the stores are full, no further metal will be mined.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function MetalStorage(level) {
  Building.call(this, level);
}

MetalStorage.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'metalStorage',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
  },
};

export default MetalStorage;
