import DataType from 'sequelize';
import Model from '../sequelize';

const Ship = Model.define('Ship', {

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

// TODO: decide if ids must go on Ship or ShipTech
Ship.LIGHT_FIGHTER_ID = 204;
Ship.HEAVY_FIGHTER_ID = 205;
Ship.CRUISER_ID = 206;
Ship.BATTLESHIP_ID = 207;

Ship.BATTLE_CRUISER_ID = 215;
Ship.BOMBER_ID = 211;
Ship.DESTROYER_ID = 213;
Ship.DEATH_STAR_ID = 214;

Ship.SMALL_CARGO_ID = 202;
Ship.LARGE_CARGO_ID = 203;
Ship.COLONY_SHIP_ID = 208;

Ship.RECYCLER_ID = 209;
Ship.ESPIONAGE_PROBE_ID = 210;
Ship.SOLAR_SATELLITE_ID = 212;

export default Ship;
