import Defense from './Defense';

const name = 'Plasma Turret';

/**
 * http://ogame.wikia.com/wiki/Plasma_Turret
 * @param {*} player
 */
function PlasmaTurret(player) {
  this.player = player;
}

PlasmaTurret.prototype = {
  ...Defense.prototype,
  name,
  cost: {
    metal: 50000,
    crystal: 50000,
    deuterium: 30000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 300,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 3000,
};

export default PlasmaTurret;
