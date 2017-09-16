import Technology from './Technology';


const name = 'Hyperspace Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function HyperspaceTechnology(level) {
  Technology.call(this, level);
}

HyperspaceTechnology.prototype = {
  ...Technology.prototype,
  id: 'hyperspaceTech',
  name,
  baseCost: {
    metal: 4000,
    crystal: 2000,
  },
}

export default HyperspaceTechnology;
