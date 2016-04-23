import { EspionageProbeType } from '../../types/ships';
import { Ship } from '../../models';

const espionageProbe = {
  type: EspionageProbeType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.ESPIONAGE_PROBE_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Espionage Probe',
      description: 'Espionage probes are small, ' +
      'agile drones that provide data on fleets and planets over great distances.',
      longDescription: 'Espionage probes are small, ' +
      'agile drones that provide data on fleets and planets. ' +
      'Fitted with specially designed engines, ' +
      'it allows them to cover vast distances in only a few minutes. ' +
      'Once in orbit around the target planet, ' +
      'they quickly collect data and transmit the report back via ' +
      'your Deep Space Network for evaluation. ' +
      'But there is a risk to the intelligent gathering aspect. ' +
      'During the time the report is transmitted back to your network, ' +
      'the signal can be detected by the target and the probes can be destroyed.',
    });
  },
};

export default espionageProbe;
