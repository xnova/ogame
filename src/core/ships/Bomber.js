import Ship from './Ship';


const name = 'Bomber';

/**
 * http://ogame.wikia.com/wiki/Bomber
 * @param {*} player
 */
function Bomber(player) {

}

Bomber.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 50000,
    crystal: 25000,
    deuterium: 15000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 500,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 1000,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 4000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 500,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 500,
}

export default Bomber;
