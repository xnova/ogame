import DataType from 'sequelize';
import Model from '../sequelize';

const TechnologyTech = Model.define('TechnologyTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

}, {
  instanceMethods: {
    async getCosts(level) {
      const levelTech = await this.getLevelTech();
      return levelTech.getCosts(level);
    },
  },
});

export default TechnologyTech;
