import Defense from './Defense';


const name = 'Small Shield Dome';

/**
 * http://ogame.wikia.com/wiki/Small_Shield_Dome
 * @param {*} player
 */
function SmallShieldDome(player) {

}

SmallShieldDome.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 10000,
    crystal: 10000,
  },

  max: 1,

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 2000,

}

export default SmallShieldDome;
