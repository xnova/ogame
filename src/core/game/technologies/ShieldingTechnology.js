import Technology from './Technology';


const name = 'Shielding Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function ShieldingTechnology(level) {
  Technology.call(this, level);
}

ShieldingTechnology.prototype = {
  ...Technology.prototype,
  id: 'shieldingTech',
  name,
  baseCost: {
    metal: 200,
    crystal: 600,
  },
};

export default ShieldingTechnology;
