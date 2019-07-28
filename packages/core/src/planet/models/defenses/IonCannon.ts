import Defense from './Defense';

const name = 'Ion Cannon';

/**
 * http://ogame.wikia.com/wiki/Ion_Cannon
 * @param {*} player
 */
function IonCannon(player) {
  this.player = player;
}

IonCannon.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 2000,
    crystal: 6000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 500,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 150,
};

export default IonCannon;
