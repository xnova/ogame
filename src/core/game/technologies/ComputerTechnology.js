import Technology from './Technology';

const name = 'Computer Technology';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 * @param {*} level
 */
function ComputerTechnology(level) {
  Technology.call(this, level);
}

ComputerTechnology.prototype = {
  ...Technology.prototype,
  id: 'computerTech',
  name,
  baseCost: {
    crystal: 400,
    deuterium: 600,
  },
};

export default ComputerTechnology;
