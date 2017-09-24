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

const REBUILD_CHANCE = 0.7;

function Defense(player) {
  this.player = player;
}
Defense.prototype = {
  name: 'Unnamed Defense',

  cost: {},

  max: +Infinity,

  // http://ogame.wikia.com/wiki/Shield_Power
  baseShield: 1,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  baseAttack: 1,

  getDescription() {
    return `${this.description} \n\n After a battle, there is up to a ${100*REBUILD_CHANCE}% chance that failed defensive facilities can be returned to use.`;
  },

  /**
   * http://ogame.wikia.com/wiki/Defense
   * @param {*} planet
   * Returns the construction time of this defense (1) on the given planet in seconds.
   */
  getDuration(planet) {
    const cost = this.getCost();
    const baseDuration = (cost.metal + cost.crystal) * (3600 / 2500);

    const shipyardFactor = 1 + planet.buildings.shipyard.level;
    const naniteFactor = 2 ** planet.buildings.naniteFactory.level;
    return baseDuration / (shipyardFactor * naniteFactor);
  },

  /**
   * http://ogame.wikia.com/wiki/Structural_Integrity
   */
  getBaseStructuralIntegrity() {
    const cost = this.cost;
    return cost.metal + cost.crystal;
  },

  /**
   * http://ogame.wikia.com/wiki/Hull_plating
   */
  getBaseHull() {
    return this.getBaseStructuralIntegrity() / 10;
  },

  /**
   * http://ogame.wikia.com/wiki/Shield_Power
   */
  getShield() {
    const shieldTech = this.player.technologies.shieldTech;
    return this.baseShield * (1 + 0.1 * shieldTech.level);
  },

  /**
   * http://ogame.wikia.com/wiki/Weapons_Technology
   */
  getAttack() {
    const weaponsTech = this.player.technologies.weaponsTech;
    return this.baseAttack * (1 + 0.1 * weaponsTech.level);
  },

  /**
   * http://ogame.wikia.com/wiki/Hull_plating
   */
  getHull() {
    const armourTech = this.player.technologies.armourTech;
    return this.getBaseHull() * (1 + 0.1 * armourTech.level);
  },
};
