/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { HyperspaceDrive } from '../technologies/HyperspaceDrive';

import { Ship } from './Ship';

const name = 'Battleship';

/**
 * http://ogame.wikia.com/wiki/Battleship
 */
export class Battleship extends Ship {}

Battleship.prototype.name = name;
Battleship.prototype.cost = Resources.Partial({
    metal: 45000,
    crystal: 15000,
});
Battleship.prototype.requirements = [new Shipyard(7), new HyperspaceDrive(4)];
