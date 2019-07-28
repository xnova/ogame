import Defense from './Defense';

const name = 'Rocket Launcher';
const shortDesc =
  'The rocket launcher is a simple, cost-effective defensive option.';
const description =
  'Your first basic line of defence. These are simple ground based launch facilities that fire conventional warhead tipped missiles at attacking enemy targets. As they are cheap to construct and no research is required, they are well suited for defending raids, but lose effectiveness defending from larger scale attacks. Once you begin construction on more advanced defence weapons systems, Rocket Launchers become simple fodder to allow your more damaging weapons to inflict greater damage for a longer period of time.';

/**
 * http://ogame.wikia.com/wiki/Rocket_Launcher
 * @param {*} player
 */
function RocketLauncher(player) {
  this.player = player;
}

RocketLauncher.prototype = {
  ...Defense.prototype,
  name,
  shortDesc,
  description,
  cost: {
    metal: 2000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 20,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 80,
};

export default RocketLauncher;
