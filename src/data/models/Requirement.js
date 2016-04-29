import DataType from 'sequelize';
import Model from '../sequelize';

const Requirement = Model.define('Requirement', {

  level: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  },

});

export default Requirement;
