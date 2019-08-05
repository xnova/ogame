/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { EspionageTechnology } from './EspionageTechnology';
import { ImpulseDrive } from './ImpulseDrive';
import { Technology } from './Technology';

const name = 'Astrophysics';

/**
 * http://ogame.wikia.com/wiki/Astrophysics
 */
export class Astrophysics extends Technology {}

Astrophysics.prototype.name = name;
Astrophysics.prototype.baseCost = Resources.Partial({
    metal: 4000,
    crystal: 8000,
    deuterium: 4000,
});
Astrophysics.prototype.costFactor = 1.75;
Astrophysics.prototype.requirements = [
    new ResearchLab(3),
    new EspionageTechnology(4),
    new ImpulseDrive(3),
];
