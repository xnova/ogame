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
 */

import { Defense } from '../defenses';


function Ship(player) {

}
Ship.prototype = {
  ...Defense.prototype,

  name: 'Unnamed Ship',

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 0,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 0,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 0,

  // http://ogame.wikia.com/wiki/Rapid_Fire
  rapidFire: new Map(),

}

export default Ship;
