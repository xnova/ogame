import DataType from 'sequelize';
import Model from '../sequelize';

const UnitTech = Model.define('UnitTech', {

  techId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    // TODO costs
    type: new DataType.VIRTUAL(DataType.INTEGER, ['costs']), // TODO
    async get() { // TODO chapuzaaa
      const costs = await this.getCosts();
      return costs.metal + costs.crystal;
    },
  },

  basicShield: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  basicAttack: {
    type: DataType.INTEGER,
    allowNull: false,
  },

});

export default UnitTech;
