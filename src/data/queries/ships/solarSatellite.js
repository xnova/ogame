import { SolarSatelliteType } from '../../types/ships';
import shipyard from '../buildings/shipyard';

const solarSatellite = {
  type: SolarSatelliteType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 1 }, // TODO check
      ],
      structuralIntegrity: 2000,
      shieldStrength: 1,
      attackStrength: 1,
      drive: null,
      speed: 0,
      cargoCapacity: 0,
      fuelUsage: 0,
    };
  },
};

export default solarSatellite;
