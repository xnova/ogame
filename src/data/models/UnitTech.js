import DataType from 'sequelize';
import Model from '../sequelize';

const UnitTech = Model.define('UnitTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    // TODO costs
    type: new DataType.VIRTUAL(DataType.INTEGER.UNSIGNED, ['costs']), // TODO
    async get() { // TODO chapuzaaa
      const costs = await this.getCosts();
      return costs.metal + costs.crystal;
    },
  },

  basicShield: {
    type: DataType.FLOAT.UNSIGNED,
    allowNull: false,
  },

  basicAttack: {
    type: DataType.FLOAT.UNSIGNED,
    allowNull: false,
  },

});

export default UnitTech;
