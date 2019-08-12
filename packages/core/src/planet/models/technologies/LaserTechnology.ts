/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { EnergyTechnology } from './EnergyTechnology';
import { Technology } from './Technology';

const name = 'Laser Technology';

/**
 * http://ogame.wikia.com/wiki/Laser_Technology
 */
export class LaserTechnology extends Technology {}

LaserTechnology.prototype.name = name;
LaserTechnology.prototype.baseCost = Resources.Partial({
    metal: 200,
    crystal: 100,
});
LaserTechnology.prototype.requirements = [
    new ResearchLab({ level: 1 }),
    new EnergyTechnology({ level: 2 }),
];
