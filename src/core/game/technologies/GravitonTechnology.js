import Technology from './Technology';

const name = 'Graviton Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function GravitonTechnology(level) {
  Technology.call(this, level);
}

GravitonTechnology.prototype = {
  ...Technology.prototype,
  id: 'gravitonTech',
  name,
  baseCost: {
    energy: 300000,
  },
  costFactor: 3,
};

export default GravitonTechnology;
