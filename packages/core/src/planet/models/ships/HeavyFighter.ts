/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Heavy Fighter';

/**
 * http://ogame.wikia.com/wiki/Heavy_Fighter
 */
export class HeavyFighter extends Ship {}

HeavyFighter.prototype.name = name;
HeavyFighter.prototype.cost = Resources.Partial({
    metal: 6000,
    crystal: 4000,
});
