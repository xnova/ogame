/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Defense } from './Defense';

const name = 'Heavy Laser';

/**
 * http://ogame.wikia.com/wiki/Heavy_Laser
 */
export class HeavyLaser extends Defense {}

HeavyLaser.prototype.name = name;
HeavyLaser.prototype.cost = Resources.Partial({
    metal: 6000,
    crystal: 2000,
});
