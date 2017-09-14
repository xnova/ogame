import Ship from './Ship';


const name = 'Battleship';

/**
 * http://ogame.wikia.com/wiki/Battleship
 * @param {*} player
 */
function Battleship(player) {

}

Battleship.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 45000,
    crystal: 15000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 200,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 1000,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 10000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 1500,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 250,
}

export default Battleship;
