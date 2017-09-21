import Technology from './Technology';


const name = 'Armour Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function ArmourTechnology(level) {
  Technology.call(this, level);
}

ArmourTechnology.prototype = {
  ...Technology.prototype,
  id: 'armourTech',
  name,
  baseCost: {
    metal: 1000,
  },
};

export default ArmourTechnology;
