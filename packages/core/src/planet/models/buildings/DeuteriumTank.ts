/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Deuterium Tank';

/**
 * http://ogame.wikia.com/wiki/Deuterium_Tank
 */
export class DeuteriumTank extends Building {}

DeuteriumTank.prototype.name = name;
DeuteriumTank.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 1000,
});
