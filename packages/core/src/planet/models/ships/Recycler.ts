/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { CombustionDrive } from '../technologies/CombustionDrive';
import { ShieldingTechnology } from '../technologies/ShieldingTechnology';

import { Ship } from './Ship';

const name = 'Recycler';

/**
 * http://ogame.wikia.com/wiki/Recycler
 */
export class Recycler extends Ship {}

Recycler.prototype.name = name;
Recycler.prototype.cost = Resources.Partial({
    metal: 10000,
    crystal: 6000,
    deuterium: 2000,
});
Recycler.prototype.requirements = [
    new Shipyard(4),
    new CombustionDrive(6),
    new ShieldingTechnology(2),
];
