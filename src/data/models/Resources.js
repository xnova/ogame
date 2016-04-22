import DataType from 'sequelize';
import Model from '../sequelize';

const Resources = Model.define('Resources', {

  metal: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  crystal: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  deuterium: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  energy: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

});

export default Resources;
