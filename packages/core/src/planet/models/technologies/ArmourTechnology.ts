/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { Technology } from './Technology';

const name = 'Armour Technology';

/**
 * http://ogame.wikia.com/wiki/Armour_Technology
 */
export class ArmourTechnology extends Technology {}

ArmourTechnology.prototype.name = name;
ArmourTechnology.prototype.baseCost = Resources.Partial({
    metal: 1000,
});
ArmourTechnology.prototype.requirements = [new ResearchLab(2)];
