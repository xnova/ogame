import { EspionageProbeType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import combustionDrive from '../technologies/combustionDrive';
import espionageTech from '../technologies/espionageTech';

const espionageProbe = {
  type: EspionageProbeType,
  resolve({ planet }) {
    const amount = 999; // TODO
    const user = null; // TODO
    return {
      id: 11812, // TODO
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
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ planet }), level: 3 }, // TODO check
        { technology: combustionDrive.resolve({ user }), level: 3 }, // TODO check
        { technology: espionageTech.resolve({ user }), level: 2 }, // TODO check
      ],
      structuralIntegrity: 1000,
      shieldStrength: 0.01, // TODO not integer? wtf
      attackStrength: 0.01, // TODO not integer? wtf
      drive: combustionDrive.resolve({ user }),
      speed: 100000000,
      cargoCapacity: 0,
      fuelUsage: 1,
    };
  },
};

export default espionageProbe;
