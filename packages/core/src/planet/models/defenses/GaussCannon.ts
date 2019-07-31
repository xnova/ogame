/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Defense } from './Defense';

const name = 'Gauss Cannon';

/**
 * http://ogame.wikia.com/wiki/Gauss_Cannon
 */
export class GaussCannon extends Defense {}

GaussCannon.prototype.name = name;
GaussCannon.prototype.cost = Resources.Partial({
    metal: 20000,
    crystal: 15000,
    deuterium: 2000,
});
