import DataType from 'sequelize';
import Model from '../sequelize';

const RapidFire = Model.define('RapidFire', {

  value: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 5, // TODO think better
  },

});

export default RapidFire;
