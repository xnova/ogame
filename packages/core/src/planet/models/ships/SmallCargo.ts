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

const name = 'Small Cargo';

/**
 * http://ogame.wikia.com/wiki/Small_Cargo
 */
export class SmallCargo extends Ship {}

SmallCargo.prototype.name = name;
SmallCargo.prototype.cost = Resources.Partial({
    metal: 2000,
    crystal: 2000,
});
SmallCargo.prototype.requirements = [
    new Shipyard({ level: 2 }),
    new CombustionDrive({ level: 2 }),
];
