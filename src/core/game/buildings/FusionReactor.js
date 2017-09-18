import Building from './Building';


const name = 'Fusion Reactor';
const shortDesc = 'The fusion reactor uses deuterium to produce energy.';
// TODO
const description = 'TODO';

/**
 * http://ogame.wikia.com/wiki/Solar_Plant
 * @param {*} level
 */
function FusionReactor(level) {
  Building.call(this, level);
}

FusionReactor.prototype = {
  ...Building.prototype,
  id: 'fusionReactor',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 900,
    crystal: 360,
    deuterium: 180,
  },
  costFactor: 1.8,
}

export default FusionReactor;
