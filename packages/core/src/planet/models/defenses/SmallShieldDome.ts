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

const name = 'Small Shield Dome';

/**
 * http://ogame.wikia.com/wiki/Small_Shield_Dome
 */
export class SmallShieldDome extends Defense {}

SmallShieldDome.prototype.name = name;
SmallShieldDome.prototype.cost = Resources.Partial({
    metal: 10000,
    crystal: 10000,
});
SmallShieldDome.prototype.max = 1;
SmallShieldDome.prototype.requirements = [
    new ShieldingTechnology({ level: 2 }),
    new Shipyard({ level: 1 }),
];
