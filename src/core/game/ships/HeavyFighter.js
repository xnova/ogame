import Ship from './Ship';


const name = 'Heavy Fighter';

/**
 * http://ogame.wikia.com/wiki/Rocket_Launcher
 * @param {*} player
 */
function HeavyFighter(player) {

}

HeavyFighter.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 6000,
    crystal: 4000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 25,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 150,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 10000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 100,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 37.5,
}

export default HeavyFighter;
