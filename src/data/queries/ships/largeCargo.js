import { LargeCargoType } from '../../types/ships';
import { Ship } from '../../models';

const largeCargo = {
  type: LargeCargoType,
  async resolve({ planet }) { // TODO
    const ship = await Ship.findOne({
      where: { PlanetId: 1, techId: 203 },
    });
    return Object.assign(ship, {
      name: 'Large Cargo',
      description: 'This cargo ship has a much larger cargo capacity than the small cargo, ' +
      'and is generally faster thanks to an improved drive.',
      longDescription: 'As time evolved, ' +
      'the raids on colonies resulted in larger and larger amounts of resources being captured. ' +
      'As a result, ' +
      'Small Cargos were being sent out in mass numbers to compensate for the larger captures. ' +
      'It was quickly learned that a new class of ship was needed to ' +
      'maximize resources captured in raids, ' +
      'yet also be cost effective. ' +
      'After much development, the Large Cargo was born. ' +
      '' + // TODO new paragraph
      'To maximize the resources that can be stored in the holds, ' +
      'this ship has little in the way of weapons or armor. ' +
      'Thanks to the highly developed combustion engine installed, ' +
      'it serves as the most economical resource supplier between planets, ' +
      'and most effective in raids on hostile worlds.',
    });
  },
};

export default largeCargo;
