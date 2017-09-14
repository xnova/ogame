import Ship from './Ship';


const name = 'Battlecruiser';

/**
 * http://ogame.wikia.com/wiki/Battlecruiser
 * @param {*} player
 */
function Battlecruiser(player) {

}

Battlecruiser.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 30000,
    crystal: 40000,
    crystal: 15000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 400,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 700,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 10000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 750,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 125,
}

export default Battlecruiser;
