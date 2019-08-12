/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { EnergyTechnology } from '../technologies/EnergyTechnology';
import { LaserTechnology } from '../technologies/LaserTechnology';

import { Defense } from './Defense';

const name = 'Heavy Laser';

/**
 * http://ogame.wikia.com/wiki/Heavy_Laser
 */
export class HeavyLaser extends Defense {}

HeavyLaser.prototype.name = name;
HeavyLaser.prototype.cost = Resources.Partial({
    metal: 6000,
    crystal: 2000,
});
HeavyLaser.prototype.requirements = [
    new EnergyTechnology({ level: 3 }),
    new Shipyard({ level: 4 }),
    new LaserTechnology({ level: 6 }),
];
