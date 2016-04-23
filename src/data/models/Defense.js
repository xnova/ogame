import DataType from 'sequelize';
import Model from '../sequelize';

const Defense = Model.define('Defense', {

  quantity: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },

  duration: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    async get() {
      const basicStructuralIntegrity = await this.getTech().get('basicStructuralIntegrity');
      return 3600 * basicStructuralIntegrity / (2500); // TODO buildings and universe speed
    },
  },

  structuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.FLOAT),
    get() {
      return this.getTech().get('basicStructuralIntegrity'); // TODO armour technology
    },
  },

  shieldStrength: {
    type: new DataType.VIRTUAL(DataType.FLOAT),
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

  maxQuantity: {
    type: new DataType.VIRTUAL(DataType.INTEGER),
    get() {
      return this.getTech().get('maxQuantity');
    },
  },

});

Defense.ROCKET_LAUNCHER_ID = 401;
Defense.LIGHT_LASER_ID = 402;
Defense.HEAVY_LASER_ID = 403;
Defense.GAUSS_CANNON_ID = 404;
Defense.ION_CANNON_ID = 405;
Defense.PLASMA_TURRET_ID = 406;
Defense.SMALL_SHIELD_DOME_ID = 407;
Defense.LARGE_SHIELD_DOME_ID = 408;

export default Defense;
