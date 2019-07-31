/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Defense } from './Defense';

const name = 'Light Laser';

/**
 * http://ogame.wikia.com/wiki/Light_Laser
 */
export class LightLaser extends Defense {}

LightLaser.prototype.name = name;
LightLaser.prototype.cost = Resources.Partial({
    metal: 1500,
    crystal: 500,
});
