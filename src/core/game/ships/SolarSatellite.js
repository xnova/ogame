import Ship from './Ship';


const name = 'SolarSatellite';

/**
 * http://ogame.wikia.com/wiki/Solar_Satellite
 * @param {*} player
 */
function SolarSatellite(player) {

}

SolarSatellite.prototype = {
  ...Ship.prototype,
  name,
  cost: {
    crystal: 2000,
    deuterium: 500,
  },
}

export default SolarSatellite;
