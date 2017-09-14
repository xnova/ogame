import Ship from './Ship';


const name = 'Espionage Probe';

/**
 * http://ogame.wikia.com/wiki/Espionage_Probe
 * @param {*} player
 */
function EspionageProbe(player) {

}

EspionageProbe.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 1000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 0.01,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 0.01,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 100000000,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 0,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 0.5,
}

export default EspionageProbe;
