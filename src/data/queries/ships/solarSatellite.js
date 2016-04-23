import { SolarSatelliteType } from '../../types/ships';
import { Ship } from '../../models';

const solarSatellite = {
  type: SolarSatelliteType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.SOLAR_SATELLITE_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Solar Satellite',
      description: 'Solar satellites are simple platforms of solar cells, ' +
      'located in a high, stationary orbit. ' +
      'They gather sunlight and transmit it to the ground station via laser. ' +
      'A solar satellite produces 26 energy on this planet.',
      longDescription: 'Scientists discovered a method of transmitting electrical energy to ' +
      'the colony using specially designed satellites in a geosynchronous orbit. ' +
      'Solar Satellites gather solar energy and ' +
      'transmit it to a ground station using advanced laser technology. ' +
      'The efficiency of a solar satellite depends on the strength of ' +
      'the solar radiation it receives. ' +
      'In principle, ' +
      'energy production in orbits closer to the sun is greater than for ' +
      'planets in orbits distant from the sun. ' +
      'Due to their good cost/performance ratio solar satellites can ' +
      'solve a lot of energy problems. ' +
      'But beware: Solar satellites can be easily destroyed in battle.',
    });
  },
};

export default solarSatellite;
