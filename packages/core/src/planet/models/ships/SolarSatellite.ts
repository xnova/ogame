/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Solar Satellite';

/**
 * http://ogame.wikia.com/wiki/Solar_Satellite
 */
export class SolarSatellite extends Ship {}

SolarSatellite.prototype.name = name;
SolarSatellite.prototype.cost = Resources.Partial({
    crystal: 2000,
    deuterium: 500,
});
