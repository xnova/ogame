import { ShipyardType } from '../../types/buildings';
import roboticsFactory from './roboticsFactory';

const shipyard = {
  type: ShipyardType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 33, // TODO
      name: 'Shipyard',
      description: 'All types of ships and defensive facilities are built ' +
      'in the planetary shipyard.',
      longDescription: 'The planetary shipyard is responsible for ' +
      'the construction of spacecraft and defensive mechanisms. ' +
      'As the shipyard is upgraded, ' +
      'it can produce a wider variety of vehicles at a much greater rate of speed. ' +
      'If a nanite factory is present on the planet, ' +
      'the speed at which ships are constructed is massively increased.',
      level,
      duration: 123,
      requirements: [
        { technology: roboticsFactory.resolve({ planet }), level: 2 }, // TODO check
      ],
      applications: [],
      canDismantle: true,
    };
  },
};

export default shipyard;
