import Technology from './Technology';


const name = 'Plasma Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function PlasmaTechnology(level) {
  Technology.call(this, level);
}

PlasmaTechnology.prototype = {
  ...Technology.prototype,
  id: 'plasmaTech',
  name,
  baseCost: {
    metal: 2000,
    crystal: 4000,
    deuterium: 1000,
  },
};

export default PlasmaTechnology;
