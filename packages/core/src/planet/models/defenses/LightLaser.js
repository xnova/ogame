import Defense from './Defense';

const name = 'Light Laser';

/**
 * http://ogame.wikia.com/wiki/Light_Laser
 * @param {*} player
 */
function LightLaser(player) {
  this.player = player;
}

LightLaser.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 1500,
    crystal: 500,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 25,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 100,
};

export default LightLaser;
