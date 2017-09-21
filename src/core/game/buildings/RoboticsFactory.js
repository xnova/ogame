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


const name = 'Robotics Factory';
const shortDesc = 'Robotic factories provide construction robots to aid in the construction of buildings. Each level increases the speed of the upgrade of buildings.';
const description = 'The Robotics Factory primary goal is the production of State of the Art construction robots. Each upgrade to the robotics factory results in the production of faster robots, which is used to reduce the time needed to construct buildings.';

/**
 * http://ogame.wikia.com/wiki/Robotics_Factory
 * @param {*} level
 */
function RoboticsFactory(level) {
  Building.call(this, level);
}

RoboticsFactory.prototype = {
  ...Building.prototype,
  id: 'roboticsFactory',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 400,
    crystal: 120,
    deuterium: 200,
  },
};

export default RoboticsFactory;
