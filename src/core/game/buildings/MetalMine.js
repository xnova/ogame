import Building from './Building';


const name = 'Metal Mine';
const shortDesc = 'Used in the extraction of metal ore, metal mines are of primary importance to all emerging and established empires.';
const description = 'Metal is the primary resource used in the foundation of your Empire. At greater depths, the mines can produce more output of viable metal for use in the construction of buildings, ships, defence systems, and research. As the mines drill deeper, more energy is required for maximum production. As metal is the most abundant of all resources available, its value is considered to be the lowest of all resources for trading.';

/**
 * http://ogame.wikia.com/wiki/Metal_Mine
 * @param {*} level
 */
function MetalMine(level) {

}

MetalMine.prototype = {
  ...Building.prototype,
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 60,
    crystal: 15,
  },
  costFactor: 1.5,
}

export default MetalMine;
