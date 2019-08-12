/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { EnergyTechnology } from './EnergyTechnology';
import { Technology } from './Technology';

const name = 'Shielding Technology';

/**
 * http://ogame.wikia.com/wiki/Shielding_Technology
 */
export class ShieldingTechnology extends Technology {}

ShieldingTechnology.prototype.name = name;
ShieldingTechnology.prototype.baseCost = Resources.Partial({
    metal: 200,
    crystal: 600,
});
ShieldingTechnology.prototype.requirements = [
    new EnergyTechnology({ level: 3 }),
    new ResearchLab({ level: 6 }),
];
