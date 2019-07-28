/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Laser Technology';

/**
 * http://ogame.wikia.com/wiki/Laser_Technology
 */
export class LaserTechnology extends Technology {}

LaserTechnology.prototype.id = 'laserTech';
LaserTechnology.prototype.name = name;
LaserTechnology.prototype.baseCost = Resources.Partial({
    metal: 200,
    crystal: 100,
});
