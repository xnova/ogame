import Defense from './Defense';


const name = 'Heavy Laser';

/**
 * http://ogame.wikia.com/wiki/Heavy_Laser
 * @param {*} player
 */
function HeavyLaser(player) {

}

HeavyLaser.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 6000,
    crystal: 2000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 100,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 250,
};

export default HeavyLaser;
