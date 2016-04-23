import DataType from 'sequelize';
import Model from '../sequelize';

const DefenseTech = Model.define('DefenseTech', {

  techId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.INTEGER), // TODO
    get() {
      return this.getUnit().get('basicStructuralIntegrity');
    },
  },

  basicShield: {
    type: new DataType.VIRTUAL(DataType.FLOAT, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicShield');
    },
  },

  basicAttack: {
    type: new DataType.VIRTUAL(DataType.FLOAT, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicAttack');
    },
  },

  maxQuantity: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

});

export default DefenseTech;
