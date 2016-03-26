import { DestroyerType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import hyperspaceDrive from '../technologies/hyperspaceDrive';
import hyperspaceTech from '../technologies/hyperspaceTech';

const destroyer = {
  type: DestroyerType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
      name: 'Destroyer',
      description: 'The destroyer is the king of the warships.',
      longDescription: 'The Destroyer is the result of years of work and development. ' +
      'With the development of Deathstars, ' +
      'it was decided that a class of ship was needed to defend against such a massive weapon. ' +
      'Thanks to its improved homing sensors, ' +
      'multi-phalanx Ion cannons, Gauss Cannons and Plasma Turrets, ' +
      'the Destroyer turned out to be one of the most fearsome ships created. ' +
      '' + // TODO new paragraph
      'Because the destroyer is very large, its manoeuvrability is severely limited, ' +
      'which makes it more of a battle station than a fighting ship. ' +
      'The lack of manoeuvrability is made up for by its sheer firepower, ' +
      'but it also costs significant amounts of deuterium to build and operate.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ user }), level: 9 }, // TODO check
        { technology: hyperspaceDrive.resolve({ player: planet.user }), level: 6 }, // TODO check
        { technology: hyperspaceTech.resolve({ player: planet.user }), level: 5 }, // TODO check
      ],
      structuralIntegrity: 110000,
      shieldStrength: 500,
      attackStrength: 2000,
      drive: hyperspaceDrive.resolve({ player: planet.user }),
      speed: 5000,
      cargoCapacity: 2000,
      fuelUsage: 1000,
    };
  },
};

export default destroyer;
