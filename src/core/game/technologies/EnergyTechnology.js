import Technology from './Technology';


const name = 'Energy Technology';
const shortDesc = 'The command of different types of energy is necessary for many new technologies.';
const description = `As various fields of research advanced, it was discovered that the current technology of energy distribution was not sufficient enough to begin certain specialized research. With each upgrade of your Energy Technology, new research can be conducted which unlocks development of more sophisticated ships and defences.`;

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function EnergyTechnology(level) {
  Technology.call(this, level);
}

EnergyTechnology.prototype = {
  ...Technology.prototype,
  id: 'energyTech',
  name,
  shortDesc,
  description,
  baseCost: {
    crystal: 800,
    deuterium: 400,
  },
}

export default EnergyTechnology;
