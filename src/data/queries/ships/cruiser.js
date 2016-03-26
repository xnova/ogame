import { CruiserType } from '../../types/ships';
import shipyard from '../buildings/shipyard';
import impulseDrive from '../technologies/impulseDrive';
import ionTech from '../technologies/ionTech';

const cruiser = {
  type: CruiserType,
  resolve({ planet }) {
    const amount = 999; // TODO
    return {
      id: 11812, // TODO
      name: 'Cruiser',
      description: 'Cruisers are armoured almost three times as heavily as heavy fighters and have more than twice the firepower. ' +
      'In addition, they are very fast.',
      longDescription: 'With the development of the heavy laser and the ion cannon, ' +
      'light and heavy fighters encountered an alarmingly high number of defeats that increased with each raid. ' +
      'Despite many modifications, weapons strength and armour changes, ' +
      'it could not be increased fast enough to effectively counter these new defensive measures. ' +
      'Therefore, it was decided to build a new class of ship that combined more armor and more firepower. ' +
      'As a result of years of research and development, the Cruiser was born. ' +
      '' + // TODO new paragraph
      'Cruisers are armored almost three times of that of the heavy fighters, ' +
      'and possess more than twice the firepower of any combat ship in existence. ' +
      'They also possess speeds that far surpassed any spacecraft ever made. ' +
      'For almost a century, cruisers dominated the universe. ' +
      'However, with the development of Gauss cannons and plasma turrets, their predominance ended. ' +
      'They are still used today against fighter groups, but not as predominantly as before.',
      amount,
      duration: null,
      requirements: [
        { technology: shipyard.resolve({ user }), level: 5 }, // TODO check
        { technology: impulseDrive.resolve({ user }), level: 4 }, // TODO check
        { technology: ionTech.resolve({ user }), level: 2 }, // TODO check
      ],
      structuralIntegrity: 27000,
      shieldStrength: 50,
      attackStrength: 400,
      drive: impulseDrive.resolve({ player: planet.user }),
      speed: 15000,
      cargoCapacity: 800,
      fuelUsage: 300,
    };
  },
};

export default cruiser;
