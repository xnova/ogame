import DataType from 'sequelize';
import Model from '../sequelize';

const BaseTech = Model.define('BaseTech', {

  techId: {
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
  },

});

export default BaseTech;
