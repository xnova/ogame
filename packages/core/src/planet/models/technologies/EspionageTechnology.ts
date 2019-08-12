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

const name = 'Espionage Technology';

/**
 * http://ogame.wikia.com/wiki/Espionage_Technology
 */
export class EspionageTechnology extends Technology {}

EspionageTechnology.prototype.name = name;
EspionageTechnology.prototype.baseCost = Resources.Partial({
    metal: 200,
    crystal: 1000,
    deuterium: 200,
});
EspionageTechnology.prototype.requirements = [new ResearchLab({ level: 3 })];
