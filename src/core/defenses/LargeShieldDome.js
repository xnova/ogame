import Defense from './Defense';


const name = 'Large Shield Dome';

/**
 * http://ogame.wikia.com/wiki/Large_Shield_Dome
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

  max: 1,

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 10000,

}

export default LargeShieldDome;
