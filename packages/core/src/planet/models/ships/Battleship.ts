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

import Ship from './Ship';

const name = 'Battleship';

/**
 * http://ogame.wikia.com/wiki/Battleship
 * @param {*} player
 */
function Battleship(player) {
  this.player = player;
}

Battleship.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 45000,
    crystal: 15000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 200,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 1000,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 10000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 1500,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 250,
};

export default Battleship;
