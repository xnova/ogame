import DataType from 'sequelize';
import Model from '../sequelize';
import Resources from './Resources';

const LevelTech = Model.define('LevelTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

  costFactor: {
    type: DataType.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue: 2,
  },

}, {
  instanceMethods: {
    async getCosts(level) {
      const basicCosts = await this.getBasicCosts();
      const factor = this.costFactor ** level;
      const costs = {
        // TODO. code better. use object map
        metal: basicCosts.metal * factor,
        crystal: basicCosts.crystal * factor,
        deuterium: basicCosts.deuterium * factor,
        energy: basicCosts.energy * factor,
      };
      return Resources.build(costs);
    },
  },
});

export default LevelTech;
