import { RoboticsFactoryType } from '../../types/buildings';

const roboticsFactory = {
  type: RoboticsFactoryType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Robotics Factory',
      description: 'Robotic factories provide construction robots to ' +
      'aid in the construction of buildings. ' +
      'Each level increases the speed of the upgrade of buildings.',
      longDescription: 'The Robotics Factory primary goal is the production of ' +
      'State of the Art construction robots. ' +
      'Each upgrade to the robotics factory results in the production of faster robots, ' +
      'which is used to reduce the time needed to construct buildings.',
      level,
      duration: 106,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default roboticsFactory;
