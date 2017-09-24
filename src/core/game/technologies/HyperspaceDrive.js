import Technology from './Technology';

const name = 'Hyperspace Drive';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function HyperspaceDrive(level) {
  Technology.call(this, level);
}

HyperspaceDrive.prototype = {
  ...Technology.prototype,
  id: 'hyperspaceDrive',
  name,
  baseCost: {
    metal: 10000,
    crystal: 20000,
    deuterium: 6000,
  },
};

export default HyperspaceDrive;
