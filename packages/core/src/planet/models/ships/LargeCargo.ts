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

import { Ship } from './Ship';

const name = 'Large Cargo';

/**
 * http://ogame.wikia.com/wiki/Large_Cargo
 */
export class LargeCargo extends Ship {}

LargeCargo.prototype.name = name;
LargeCargo.prototype.cost = Resources.Partial({
    metal: 6000,
    crystal: 6000,
});
LargeCargo.prototype.requirements = [new Shipyard(4), new CombustionDrive(6)];
