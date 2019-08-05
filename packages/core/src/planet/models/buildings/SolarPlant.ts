/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Solar Plant';

/**
 * http://ogame.wikia.com/wiki/Solar_Plant
 */
export class SolarPlant extends Building {}

SolarPlant.prototype.name = name;
SolarPlant.prototype.baseCost = Resources.Partial({
    metal: 75,
    crystal: 30,
});
