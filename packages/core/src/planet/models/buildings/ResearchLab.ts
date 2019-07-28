import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Research Lab';

/**
 * http://ogame.wikia.com/wiki/Research_Lab
 */
export class ResearchLab extends Building {}

ResearchLab.prototype.id = 'researchLab';
ResearchLab.prototype.name = name;
ResearchLab.prototype.baseCost = Resources.Partial({
    metal: 400,
    crystal: 200,
    deuterium: 100,
});
