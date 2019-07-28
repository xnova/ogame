/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Astrophysics';

/**
 * http://ogame.wikia.com/wiki/Astrophysics
 */
export class Astrophysics extends Technology {}

Astrophysics.prototype.id = 'astrophysics';
Astrophysics.prototype.name = name;
Astrophysics.prototype.baseCost = Resources.Partial({
    metal: 4000,
    crystal: 8000,
    deuterium: 4000,
});
Astrophysics.prototype.costFactor = 1.75;
