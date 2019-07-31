/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { HyperspaceTechnology } from './HyperspaceTechnology';
import { Technology } from './Technology';

const name = 'Hyperspace Drive';

/**
 * http://ogame.wikia.com/wiki/Hyperspace_Drive
 */
export class HyperspaceDrive extends Technology {}

HyperspaceDrive.prototype.id = 'hyperspaceDrive';
HyperspaceDrive.prototype.name = name;
HyperspaceDrive.prototype.baseCost = Resources.Partial({
    metal: 10000,
    crystal: 20000,
    deuterium: 6000,
});
HyperspaceDrive.prototype.requirements = [
    new ResearchLab(7),
    new HyperspaceTechnology(3),
];
