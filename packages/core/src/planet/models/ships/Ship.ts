/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { ShipyardUnit } from '../defenses/ShipyardUnit';

export abstract class Ship extends ShipyardUnit {}

Ship.prototype.name = 'Unnamed Ship';
Ship.prototype.cost = Resources.Partial({
    metal: 1,
    crystal: 1,
});
Ship.prototype.requirements = [new Shipyard({ level: 2 })];
