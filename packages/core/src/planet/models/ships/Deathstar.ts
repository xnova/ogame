/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { GravitonTechnology } from '../technologies/GravitonTechnology';
import { HyperspaceDrive } from '../technologies/HyperspaceDrive';
import { HyperspaceTechnology } from '../technologies/HyperspaceTechnology';

import { Ship } from './Ship';

const name = 'Deathstar';

/**
 * http://ogame.wikia.com/wiki/Deathstar
 */
export class Deathstar extends Ship {}

Deathstar.prototype.name = name;
Deathstar.prototype.cost = Resources.Partial({
    metal: 5000000,
    crystal: 4000000,
    deuterium: 1000000,
});
Deathstar.prototype.requirements = [
    new Shipyard(12),
    new GravitonTechnology(1),
    new HyperspaceDrive(7),
    new HyperspaceTechnology(6),
];
