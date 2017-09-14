import Ship from './Ship';
import EspionageProbe from './EspionageProbe';
import SolarSatellite from './SolarSatellite';


const name = 'Light Fighter';

const rapidFire = new Map();
rapidFire.set(EspionageProbe, 5);
rapidFire.set(SolarSatellite, 5);

/**
 * http://ogame.wikia.com/wiki/Rocket_Launcher
 * @param {*} player
 */
function LightFighter(player) {

}

LightFighter.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    metal: 3000,
    crystal: 1000,
  },

  // http://ogame.wikia.com/wiki/Shield_Power
  basicShield: 10,

  // http://ogame.wikia.com/wiki/Weapons_Technology
  basicAttack: 50,

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 12500,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 50,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 10,
}

export default LightFighter;
