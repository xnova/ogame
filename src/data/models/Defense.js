import DataType from 'sequelize';
import Model from '../sequelize';

const Defense = Model.define('Defense', {

  quantity: {
    type: DataType.INTEGER,
    // TODO default
  },

});

export default Defense;
