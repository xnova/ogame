/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { Unit } from '../defenses/Unit';

export abstract class Ship extends Unit {
    public cost: Resources;

    public getCost(): Resources {
        return this.cost;
    }

    public satisfies(requirement: Unit): boolean {
        return false;
    }
}
Ship.prototype.name = 'Unnamed Ship';
Ship.prototype.cost = Resources.Partial({
    metal: 1,
    crystal: 1,
});
Ship.prototype.requirements = [new Shipyard(2)];
