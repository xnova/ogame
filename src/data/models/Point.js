import DataType from 'sequelize';
import Model from '../sequelize';

const Point = Model.define('Point', {
  
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
    { fields: ['galaxy', 'system', 'position'] },
  ],

});

export default Point;
