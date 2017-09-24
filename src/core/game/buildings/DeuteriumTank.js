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

const name = 'Deuterium Tank';
const shortDesc = 'Giant tanks for storing newly-extracted deuterium.';
const description =
  'The Deuterium tank is for storing newly-synthesized deuterium. Once it is processed by the synthesizer, it is piped into this tank for later use. With each upgrade of the tank, the total storage capacity is increased. Once the capacity is reached, no further Deuterium will be synthesized.';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 * @param {*} level
 */
function DeuteriumTank(level) {
  Building.call(this, level);
}

DeuteriumTank.prototype = {
  ...Building.prototype,
  ...Storage.prototype,
  id: 'deuteriumTank',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 1000,
    crystal: 1000,
  },
};

export default DeuteriumTank;
