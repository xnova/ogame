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

const name = 'Light Laser';

/**
 * http://ogame.wikia.com/wiki/Light_Laser
 */
export class LightLaser extends Defense {}

LightLaser.prototype.name = name;
LightLaser.prototype.cost = Resources.Partial({
    metal: 1500,
    crystal: 500,
});
LightLaser.prototype.requirements = [
    new EnergyTechnology({ level: 1 }),
    new Shipyard({ level: 4 }),
    new LaserTechnology({ level: 3 }),
];
