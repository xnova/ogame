import Technology from './Technology';


const name = 'Intergalactic Research Network';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function IntergalacticResearchNetwork(level) {
  Technology.call(this, level);
}

IntergalacticResearchNetwork.prototype = {
  ...Technology.prototype,
  id: 'IRN',
  name,
  baseCost: {
    metal: 240000,
    crystal: 400000,
    deuterium: 160000,
  },
}

export default IntergalacticResearchNetwork;
