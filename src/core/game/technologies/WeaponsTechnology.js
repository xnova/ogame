import Technology from './Technology';


const name = 'Weapons Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function WeaponsTechnology(level) {
  Technology.call(this, level);
}

WeaponsTechnology.prototype = {
  ...Technology.prototype,
  id: 'weaponsTech',
  name,
  baseCost: {
    metal: 800,
    crystal: 200,
  },
};

export default WeaponsTechnology;
