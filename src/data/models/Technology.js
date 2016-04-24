import DataType from 'sequelize';
import Model from '../sequelize';

const Technology = Model.define('Technology', {

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

});

Technology.ENERGY_TECH_ID = 113;
Technology.LASER_TECH_ID = 120;
Technology.ION_TECH_ID = 121;
Technology.HYPERSPACE_TECH_ID = 114;
Technology.PLASMA_TECH_ID = 122;

Technology.COMBUSTION_DRIVE_ID = 115;
Technology.IMPULSE_DRIVE_ID = 117;
Technology.HYPERSPACE_DRIVE_ID = 118;

Technology.ESPIONAGE_TECH_ID = 106;
Technology.COMPUTER_TECH_ID = 108;
Technology.ASTROPHYSICS_ID = 124;
Technology.INTERGALACTIC_RESEARCH_NETWORK_ID = 123;
Technology.GRAVITON_TECH_ID = 199;

Technology.WEAPONS_TECH_ID = 109;
Technology.SHIELDING_TECH_ID = 110;
Technology.ARMOUR_TECH_ID = 111;

export default Technology;
