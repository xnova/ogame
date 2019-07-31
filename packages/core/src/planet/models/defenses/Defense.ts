/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';

import { Unit } from './Unit';

export abstract class Defense extends Unit {
    public cost: Resources;
    public max: number;

    public getCost(): Resources {
        return this.cost;
    }

    public satisfies(requirement: Unit): boolean {
        return false;
    }
}

Defense.prototype.name = 'Unnamed Defense';
Defense.prototype.cost = Resources.Partial({
    metal: 1,
    crystal: 1,
});
Defense.prototype.requirements = [new Shipyard(1)];
Defense.prototype.max = Number.POSITIVE_INFINITY;
