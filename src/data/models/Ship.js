import DataType from 'sequelize';
import Model from '../sequelize';

const Ship = Model.define('Ship', {

  quantity: {
    type: DataType.INTEGER,
    // TODO default
  },

  structuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('basicStructuralIntegrity'); // TODO armour technology
    },
  },

  shieldStrength: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('basicShield'); // TODO shield technology
    },
  },

  attackStrength: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('basicAttack'); // TODO attack technology
    },
  },

  speed: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('basicSpeed'); // TODO DRIVE
    },
  },

  cargoCapacity: {
    type: new DataType.VIRTUAL(DataType.INTEGER, 'Tech'),
    get() {
      return this.getTech().get('cargoCapacity'); // TODO better?
    },
  },

  fuelUsage: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('fuelUsage'); // TODO better?
    },
  },

});

export default Ship;
