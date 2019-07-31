/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Cruiser';

/**
 * http://ogame.wikia.com/wiki/Cruiser
 */
export class Cruiser extends Ship {}

Cruiser.prototype.name = name;
Cruiser.prototype.cost = Resources.Partial({
    metal: 20000,
    crystal: 7000,
    deuterium: 2000,
});
