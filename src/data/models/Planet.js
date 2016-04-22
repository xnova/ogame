import DataType from 'sequelize';
import Model from '../sequelize';

const Planet = Model.define('Planet', {

  name: DataType.STRING,

  diameter: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  fields: {
    // TODO terraformer
    type: new DataType.VIRTUAL(DataType.INTEGER, ['diameter']),
    get() {
      return Math.floor(Math.pow(this.diameter / 1000, 2));
    },
  },

});

export default Planet;
