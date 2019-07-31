/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Battlecruiser';

/**
 * http://ogame.wikia.com/wiki/Battlecruiser
 */
export class Battlecruiser extends Ship {}

Battlecruiser.prototype.name = name;
Battlecruiser.prototype.cost = Resources.Partial({
    metal: 30000,
    crystal: 40000,
    deuterium: 15000,
});
