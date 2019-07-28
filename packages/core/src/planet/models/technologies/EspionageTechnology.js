import Technology from './Technology';

const name = 'Espionage Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function EspionageTechnology(level) {
  Technology.call(this, level);
}

EspionageTechnology.prototype = {
  ...Technology.prototype,
  id: 'espionageTech',
  name,
  baseCost: {
    metal: 200,
    crystal: 1000,
    deuterium: 200,
  },
};

export default EspionageTechnology;
