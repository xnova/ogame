import DataType from 'sequelize';
import Model from '../sequelize';

const Coordinates = Model.define('Coordinates', {

  galaxy: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  system: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  position: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

}, {

  indexes: [
    { fields: ['galaxy', 'system', 'position'] }, // TODO check
  ],

});

export default Coordinates;
