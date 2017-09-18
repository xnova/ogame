import Building from './Building';


const name = 'Missile Silo';
const shortDesc = 'Missile silos are used to store missiles.';
const description = `Missile silos are used to construct, store and launch interplanetary and anti-ballistic missiles. With each level of the silo, five interplanetary missiles or ten anti-ballistic missiles can be stored. One Interplanetary missile uses the same space as two Anti-Ballistic missiles. Storage of both Interplanetary missiles and Anti-Ballistic missiles in the same silo is allowed.`;

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function MissileSilo(level) {
  Building.call(this, level);
}

MissileSilo.prototype = {
  ...Building.prototype,
  id: 'silo',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 20000,
    crystal: 20000,
    deuterium: 1000,
  },

  getStorageCapacity() {
    return 10 * this.level;
  },
}

export default MissileSilo;
