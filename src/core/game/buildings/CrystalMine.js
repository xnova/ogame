import Building from './Building';


const name = 'Crystal Mine';
const shortDesc = 'Crystals are the main resource used to build electronic circuits and form certain alloy compounds.';
const description = 'Metal is the primary resource used in the foundation of your Empire. At greater depths, the mines can produce more output of viable metal for use in the construction of buildings, ships, defence systems, and research. As the mines drill deeper, more energy is required for maximum production. As metal is the most abundant of all resources available, its value is considered to be the lowest of all resources for trading.';

/**
 * http://ogame.wikia.com/wiki/Crystal_Mine
 * @param {*} level
 */
function CrystalMine(level) {
  Building.call(this, level);
}

CrystalMine.prototype = {
  ...Building.prototype,
  id: 'crystalMine',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 48,
    crystal: 24,
  },
  costFactor: 1.6,
}

export default CrystalMine;
