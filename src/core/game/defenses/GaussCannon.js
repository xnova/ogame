import Defense from './Defense';

const name = 'Gauss Cannon';

/**
 * http://ogame.wikia.com/wiki/Gauss_Cannon
 * @param {*} player
 */
function GaussCannon(player) {
  this.player = player;
}

GaussCannon.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 20000,
    crystal: 15000,
    deuterium: 2000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 200,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 1100,
};

export default GaussCannon;
