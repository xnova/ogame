import Defense from './Defense';


const name = 'Large Shield Dome';

/**
 * http://ogame.wikia.com/wiki/Plasma_Turret
 * @param {*} player
 */
function LargeShieldDome(player) {

}

LargeShieldDome.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 50000,
    crystal: 50000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 10000,

}

export default LargeShieldDome;
