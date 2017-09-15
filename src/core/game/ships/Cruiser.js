import Ship from './Ship';


const name = 'Cruiser';

/**
 * http://ogame.wikia.com/wiki/Rocket_Launcher
 * @param {*} player
 */
function Cruiser(player) {

}

Cruiser.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 20000,
    crystal: 7000,
    deuterium: 2000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 50,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 400,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 15000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 800,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 150,
}

export default Cruiser;
