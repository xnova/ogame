import Building from './Building';


const name = 'Robotics Factory';
const shortDesc = 'Robotic factories provide construction robots to aid in the construction of buildings. Each level increases the speed of the upgrade of buildings.';
const description = 'The Robotics Factory primary goal is the production of State of the Art construction robots. Each upgrade to the robotics factory results in the production of faster robots, which is used to reduce the time needed to construct buildings.';

/**
 * http://ogame.wikia.com/wiki/Robotics_Factory
 * @param {*} level
 */
function RoboticsFactory(level) {

}

RoboticsFactory.prototype = {
  ...Building.prototype,
  name,
  shortDesc,
  description,
  baseCost: {
    metal: 400,
    crystal: 120,
    deuterium: 200,
  },
}

export default RoboticsFactory;