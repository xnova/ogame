import DataType from 'sequelize';
import Model from '../sequelize';

const Coordinates = Model.define('Coordinates', {

  galaxy: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  system: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  position: {
    type: DataType.INTEGER,
    allowNull: false,
  },

}, {

  indexes: [
    { fields: ['galaxy', 'system', 'position'] }, // TODO check
  ],

});

export default Coordinates;
