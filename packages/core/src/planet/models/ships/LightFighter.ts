/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Light Fighter';

/**
 * http://ogame.wikia.com/wiki/Light_Fighter
 */
export class LightFighter extends Ship {}

LightFighter.prototype.name = name;
LightFighter.prototype.cost = Resources.Partial({
    metal: 3000,
    crystal: 1000,
});
