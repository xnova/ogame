import Technology from './Technology';


const name = 'Impulse Drive';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function ImpulseDrive(level) {
  Technology.call(this, level);
}

ImpulseDrive.prototype = {
  ...Technology.prototype,
  id: 'impulseDrive',
  name,
  baseCost: {
    metal: 2000,
    crystal: 4000,
    deuterium: 600,
  },
}

export default ImpulseDrive;
