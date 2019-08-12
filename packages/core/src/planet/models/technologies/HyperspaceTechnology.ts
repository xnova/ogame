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
import { ShieldingTechnology } from './ShieldingTechnology';
import { Technology } from './Technology';

const name = 'Hyperspace Technology';

/**
 * http://ogame.wikia.com/wiki/Hyperspace_Technology
 */
export class HyperspaceTechnology extends Technology {}

HyperspaceTechnology.prototype.name = name;
HyperspaceTechnology.prototype.baseCost = Resources.Partial({
    metal: 4000,
    crystal: 2000,
});
HyperspaceTechnology.prototype.requirements = [
    new ResearchLab({ level: 7 }),
    new EnergyTechnology({ level: 5 }),
    new ShieldingTechnology({ level: 5 }),
];
