/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { HyperspaceTechnology } from '../technologies';
import { HyperspaceDrive } from '../technologies/HyperspaceDrive';

import { Ship } from './Ship';

const name = 'Destroyer';

/**
 * http://ogame.wikia.com/wiki/Destroyer
 */
export class Destroyer extends Ship {}

Destroyer.prototype.name = name;
Destroyer.prototype.cost = Resources.Partial({
    metal: 60000,
    crystal: 50000,
    deuterium: 15000,
});
Destroyer.prototype.requirements = [
    new Shipyard(9),
    new HyperspaceDrive(6),
    new HyperspaceTechnology(5),
];
