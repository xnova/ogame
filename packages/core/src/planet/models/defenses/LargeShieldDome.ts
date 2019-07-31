/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { ShieldingTechnology } from '../technologies/ShieldingTechnology';

import { Defense } from './Defense';

const name = 'Large Shield Dome';

/**
 * http://ogame.wikia.com/wiki/Large_Shield_Dome
 */
export class LargeShieldDome extends Defense {}

LargeShieldDome.prototype.name = name;
LargeShieldDome.prototype.cost = Resources.Partial({
    metal: 50000,
    crystal: 50000,
});
LargeShieldDome.prototype.max = 1;
LargeShieldDome.prototype.requirements = [
    new ShieldingTechnology(6),
    new Shipyard(6),
];
