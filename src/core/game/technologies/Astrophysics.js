import Technology from './Technology';


const name = 'Astrophysics';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function Astrophysics(level) {
  Technology.call(this, level);
}

Astrophysics.prototype = {
  ...Technology.prototype,
  id: 'astrophysics',
  name,
  baseCost: {
    metal: 4000,
    crystal: 8000,
    deuterium: 4000,
  },
  costFactor: 1.75,
}

export default Astrophysics;
