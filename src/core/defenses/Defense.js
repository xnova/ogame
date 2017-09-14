

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
    return "${this.description} \n\n After a battle, there is up to a ${100*REBUILD_CHANCE}% chance that failed defensive facilities can be returned to use.";
  },

  /**
   * http://ogame.wikia.com/wiki/Defense
   * @param {*} planet
   * Returns the construction time of this defense (1) on the given planet in seconds.
   */
  getDuration(planet) {
    const cost = this.getCost();
    const baseDuration = (cost.metal + cost.crystal) * 3600 / 2500;

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

}
