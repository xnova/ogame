import Technology from './Technology';

const name = 'Ion Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function IonTechnology(level) {
  Technology.call(this, level);
}

IonTechnology.prototype = {
  ...Technology.prototype,
  id: 'ionTech',
  name,
  baseCost: {
    metal: 1000,
    crystal: 300,
    deuterium: 100,
  },
};

export default IonTechnology;
