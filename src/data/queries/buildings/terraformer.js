import { TerraformerType } from '../../types/buildings';
import naniteFactory from './naniteFactory';
import energyTech from '../technologies/energyTech';

const terraformer = {
  type: TerraformerType,
  resolve({ planet }) {
    const level = 8; // TODO
    return {
      id: 11812, // TODO
      name: 'Terraformer',
      description: 'The terraformer increases the usable surface of planets.',
      longDescription: 'With the ever increasing mining of a colony, a problem arose. ' +
      'How can we continue to operate at a planets capacity and still survive? ' +
      'The land is being mined out and the atmosphere is deteriorating. ' +
      'Mining a colony to capacity can not only destroy the planet, ' +
      'but may kill all life on it. ' +
      'Scientists working feverishly discovered a method of creating enormous land masses using nanomachines. ' +
      'The Terraformer was born.' +
      '' + // TODO check new paragraph
      ' Once built, the Terraformer cannot be torn down.',
      level,
      duration: 8000,
      requirements: [
        { technology: naniteFactory.resolve({ planet }), level: 1 }, // TODO check
        { technology: energyTech.resolve({ user }), level: 10 }, // TODO check
      ],
      applications: [],
      canDismantle: false,
    };
  },
};

export default terraformer;
