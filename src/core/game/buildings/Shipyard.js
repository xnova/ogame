import Building from './Building';
import RoboticsFactory from './RoboticsFactory';

const name = 'Shipyard';
const shortDesc =
  'All types of ships and defensive facilities are built in the planetary shipyard.';
const description =
  'The planetary shipyard is responsible for the construction of spacecraft and defensive mechanisms. As the shipyard is upgraded, it can produce a wider variety of vehicles at a much greater rate of speed. If a nanite factory is present on the planet, the speed at which ships are constructed is massively increased.';

const requirements = new Map();
requirements.set(RoboticsFactory, 2);

/**
 * http://ogame.wikia.com/wiki/Shipyard
 * @param {*} level
 */
function Shipyard(level) {
  Building.call(this, level);
}

Shipyard.prototype = {
  ...Building.prototype,
  id: 'shipyard',
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 400,
    crystal: 200,
    deuterium: 100,
  },
  requirements,
};

export default Shipyard;
