import DataType from 'sequelize';
import Model from '../sequelize';

const DefenseTech = Model.define('DefenseTech', {

  techId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    // TODO costs
    type: new DataType.VIRTUAL(DataType.INTEGER), // TODO
    get() {
      return this.unit.structuralIntegrity; // TODO
    },
  },

  basicShield: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
    get() {
      return this.unit.basicShield; // TODO
    },
  },

  basicAttack: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
    get() {
      return this.unit.basicAttack; // TODO
    },
  },

});

DefenseTech.ROCKET_LAUNCHER_ID = 401;
DefenseTech.LIGHT_LASER_ID = 402;
DefenseTech.HEAVY_LASER_ID = 403;
DefenseTech.GAUSS_CANNON_ID = 404;
DefenseTech.ION_CANNON_ID = 405;
DefenseTech.PLASMA_TURRET_ID = 406;
DefenseTech.SMALL_SHIELD_DOME_ID = 407;
DefenseTech.LARGE_SHIELD_DOME_ID = 408;

export default DefenseTech;
