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

const name = 'Weapons Technology';

/**
 * http://ogame.wikia.com/wiki/Weapons Technology
 */
export class WeaponsTechnology extends Technology {}

WeaponsTechnology.prototype.name = name;
WeaponsTechnology.prototype.baseCost = Resources.Partial({
    metal: 800,
    crystal: 200,
});
WeaponsTechnology.prototype.requirements = [new ResearchLab({ level: 4 })];
