import DataType from 'sequelize';
import Model from '../sequelize';

const Building = Model.define('Building', {

  level: {
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },

  duration: {
    type: new DataType.VIRTUAL(DataType.INTEGER.UNSIGNED, ['costs']),
    async get() {
      const costs = await this.get('costs');
      // TODO buildings and universe speed
      let duration = 3600 * (costs.metal + costs.crystal) / (1000);
      if (duration < 1) duration = 1;
      return duration;
    },
  },

  costs: {
    type: new DataType.VIRTUAL,
    async get() {
      const tech = await this.getTech();
      return tech.getCosts(this.getDataValue('level'));
    },
  },

  canDismantle: {
    type: new DataType.VIRTUAL(DataType.BOOLEAN),
    get() {
      return this.getTech().get('canDismantle');
    },
  },

});


Building.METAL_MINE_ID = 1;
Building.CRYSTAL_MINE_ID = 2;
Building.DEUTERIUM_SYNTHESIZER_ID = 3;
Building.SOLAR_PLANT_ID = 4;
Building.FUSION_REACTOR_ID = 12;
Building.ROBOTICS_FACTORY_ID = 14;
Building.NANITE_FACTORY_ID = 15;
Building.SHIPYARD_ID = 21;
Building.METAL_STORAGE_ID = 22;
Building.CRYSTAL_STORAGE_ID = 23;
Building.DEUTERIUM_TANK_ID = 24;
Building.RESEARCH_LAB_ID = 31;
Building.TERRAFORMER_ID = 33;
Building.ALLIANCE_DEPOT_ID = 34;
Building.MISSILE_SILO_ID = 44;

export default Building;
