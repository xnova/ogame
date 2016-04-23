import { CruiserType } from '../../types/ships';
import { Ship } from '../../models';

const cruiser = {
  type: CruiserType,
  async resolve({ planet }) {
    const where = { PlanetId: 1, techId: Ship.CRUISER_ID };
    let ship = await Ship.findOne({ where });
    if (!ship) {
      ship = Ship.build(where);
    }
    return Object.assign(ship, {
      name: 'Cruiser',
      description: 'Cruisers are armoured almost three times as heavily as heavy fighters and ' +
      'have more than twice the firepower. ' +
      'In addition, they are very fast.',
      longDescription: 'With the development of the heavy laser and the ion cannon, ' +
      'light and heavy fighters encountered an alarmingly high number ' +
      'of defeats that increased with each raid. ' +
      'Despite many modifications, weapons strength and armour changes, ' +
      'it could not be increased fast enough to ' +
      'effectively counter these new defensive measures. ' +
      'Therefore, ' +
      'it was decided to build a new class of ship that combined more armor and more firepower. ' +
      'As a result of years of research and development, the Cruiser was born. ' +
      '' + // TODO new paragraph
      'Cruisers are armored almost three times of that of the heavy fighters, ' +
      'and possess more than twice the firepower of any combat ship in existence. ' +
      'They also possess speeds that far surpassed any spacecraft ever made. ' +
      'For almost a century, cruisers dominated the universe. ' +
      'However, with the development of Gauss cannons and plasma turrets, ' +
      'their predominance ended. ' +
      'They are still used today against fighter groups, but not as predominantly as before.',
    });
  },
};

export default cruiser;
