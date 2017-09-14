import { Defense } from '../defenses';


function Ship(player) {

}
Ship.prototype = {
  ...Defense.prototype,

  name: 'Unnamed Ship',

  // http://ogame.wikia.com/wiki/Base_Speed
  baseSpeed: 0,

  // http://ogame.wikia.com/wiki/Cargo_Capacity
  cargoCapacity: 0,

  // http://ogame.wikia.com/wiki/Fuel_Consumption
  fuelUsage: 0,

  // http://ogame.wikia.com/wiki/Rapid_Fire
  rapidFire: new Map(),

}

export default Ship;
