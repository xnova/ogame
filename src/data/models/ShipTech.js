import DataType from 'sequelize';
import Model from '../sequelize';

const ShipTech = Model.define('ShipTech', {

  techId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
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

  basicSpeed: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  cargoCapacity: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  fuelUsage: {
    type: DataType.INTEGER,
    allowNull: false,
  },

});

export default ShipTech;
