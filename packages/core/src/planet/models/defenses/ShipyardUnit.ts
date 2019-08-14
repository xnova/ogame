/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { Resources } from '../../../shared/resources';

import { Unit } from './Unit';

export abstract class ShipyardUnit extends Unit {
    public cost: Resources;
    public max: number;

    public getCost(): Resources {
        return this.cost;
    }
}

ShipyardUnit.prototype.max = Number.POSITIVE_INFINITY;
