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

const name = 'Graviton Technology';
const COST_FACTOR = 3;

/**
 * http://ogame.wikia.com/wiki/Graviton_Technology
 */
export class GravitonTechnology extends Technology {}

GravitonTechnology.prototype.name = name;
GravitonTechnology.prototype.baseCost = Resources.Partial({
    energy: 300000,
});
GravitonTechnology.prototype.costFactor = COST_FACTOR;
GravitonTechnology.prototype.requirements = [new ResearchLab({ level: 12 })];
