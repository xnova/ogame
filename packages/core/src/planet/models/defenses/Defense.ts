/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';

import { ShipyardUnit } from './ShipyardUnit';

export abstract class Defense extends ShipyardUnit {}

Defense.prototype.name = 'Unnamed Defense';
Defense.prototype.cost = Resources.Partial({
    metal: 1,
    crystal: 1,
});
Defense.prototype.requirements = [new Shipyard({ level: 1 })];
