import DataType from 'sequelize';
import Model from '../sequelize';

const BuildingTech = Model.define('BuildingTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

  canDismantle: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  basicShield: {
    type: new DataType.VIRTUAL(DataType.FLOAT.UNSIGNED, ['unit']), // TODO
    get() {
      return this.getLevelTech().getCosts();
    },
  },

}, {
  instanceMethods: {

    async getCosts(level) {
      const levelTech = await this.getLevelTech();
      return levelTech.getCosts(level);
    },

    requires(tech, { level }) {
      this.levelTech.baseTech.addRequirement(tech.techId, { level });
    },

  },
});

export default BuildingTech;
