import DataType from 'sequelize';
import Model from '../sequelize';

const ShipTech = Model.define('ShipTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.INTEGER.UNSIGNED, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicStructuralIntegrity');
    },
  },

  basicShield: {
    type: new DataType.VIRTUAL(DataType.FLOAT.UNSIGNED, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicShield');
    },
  },

  basicAttack: {
    type: new DataType.VIRTUAL(DataType.FLOAT.UNSIGNED, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicAttack');
    },
  },

  basicSpeed: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  },

  cargoCapacity: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  },

  fuelUsage: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  },

});

export default ShipTech;
