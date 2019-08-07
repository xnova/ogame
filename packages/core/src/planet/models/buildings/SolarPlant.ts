/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Mine } from './Mine';

const name = 'Solar Plant';

/**
 * http://ogame.wikia.com/wiki/Solar_Plant
 */
export class SolarPlant extends Mine {}

SolarPlant.prototype.name = name;
SolarPlant.prototype.baseCost = Resources.Partial({
    metal: 75,
    crystal: 30,
});
SolarPlant.prototype.baseProduction = Resources.Partial({
    energy: 20,
});
