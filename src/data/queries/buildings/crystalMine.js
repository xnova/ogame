import { CrystalMineType } from '../../types/buildings';

const crystalMine = {
  type: CrystalMineType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Crystal Mine',
      description: 'Crystals are the main resource used ' +
      'to build electronic circuits and form certain alloy compounds.',
      longDescription: 'Crystal mines supply the main resource used ' +
      'to produce electronic circuits and from certain alloy compounds. ' +
      'Mining crystal consumes some one and half times more energy than a mining metal, ' +
      'making crystal more valuable. ' +
      'Almost all ships and all buildings require crystal. ' +
      'Most crystals required to build spaceships, however, are very rare, ' +
      'and like metal can only be found at a certain depth. ' +
      'Therefore, building mines in deeper strata will increase the amount of crystal produced.',
      level,
      duration: 123,
      requirements: [],
      applications: [],
      canDismantle: true,
    };
  },
};

export default crystalMine;
