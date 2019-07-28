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

const name = 'Crystal Storage';
const shortDesc = 'Provides storage for excess crystal.';
const description =
  'The unprocessed crystal will be stored in these giant storage halls in the meantime. With each level of upgrade, it increases the amount of crystal can be stored. If the crystal stores are full, no further crystal will be mined.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function CrystalStorage(level) {
  Building.call(this, level);
}

CrystalStorage.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'crystalStorage',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
    crystal: 500,
  },
};

export default CrystalStorage;
