import Technology from './Technology';


const name = 'Laser Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function LaserTechnology(level) {
  Technology.call(this, level);
}

LaserTechnology.prototype = {
  ...Technology.prototype,
  id: 'laserTech',
  name,
  baseCost: {
    metal: 200,
    crystal: 100,
  },
}

export default LaserTechnology;
