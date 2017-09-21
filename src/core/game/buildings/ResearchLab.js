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


const name = 'Research Lab';
const shortDesc = 'A research lab is required in order to conduct research into new technologies.';
const description = 'An essential part of any empire, Research Labs are where new technologies are discovered and older technologies are improved upon. With each level of the Research Lab constructed, the speed in which new technologies are researched is increased, while also unlocking newer technologies to research. In order to conduct research as quickly as possible, research scientists are immediately dispatched to the colony to begin work and development. In this way, knowledge about new technologies can easily be disseminated throughout the empire.';

/**
 * http://ogame.wikia.com/wiki/Robotics_Factory
 * @param {*} level
 */
function ResearchLab(level) {
  Building.call(this, level);
}

ResearchLab.prototype = {
  ...Building.prototype,
  id: 'researchLab',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 400,
    crystal: 200,
    deuterium: 100,
  },
};

export default ResearchLab;
