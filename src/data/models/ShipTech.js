import DataType from 'sequelize';
import Model from '../sequelize';

const ShipTech = Model.define('ShipTech', {

  techId: {
    type: DataType.INTEGER,
    primaryKey: true,
  },

  basicStructuralIntegrity: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicStructuralIntegrity');
    },
  },

  basicShield: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicShield');
    },
  },

  basicAttack: {
    type: new DataType.VIRTUAL(DataType.INTEGER, ['unit']), // TODO
    get() {
      return this.getUnit().get('basicAttack');
    },
  },

  basicSpeed: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  cargoCapacity: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  fuelUsage: {
    type: DataType.INTEGER,
    allowNull: false,
  },

});

ShipTech.LIGHT_FIGHTER_ID = 204;
ShipTech.HEAVY_FIGHTER_ID = 205;
ShipTech.CRUISER_ID = 206;
ShipTech.BATTLESHIP_ID = 207;

ShipTech.BATTLE_CRUISER_ID = 215;
ShipTech.BOMBER_ID = 211;
ShipTech.DESTROYER_ID = 213;
ShipTech.DEATH_STAR_ID = 214;

ShipTech.SMALL_CARGO_ID = 202;
ShipTech.LARGE_CARGO_ID = 203;
ShipTech.COLONY_SHIP_ID = 208;

ShipTech.RECYCLER_ID = 209;
ShipTech.ESPIONAGE_PROBE_ID = 210;
ShipTech.SOLAR_SATELLITE_ID = 212;

export default ShipTech;
