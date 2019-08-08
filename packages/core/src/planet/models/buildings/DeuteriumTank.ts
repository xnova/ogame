/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Warehouse } from './Warehouse';

const name = 'Deuterium Tank';

/**
 * http://ogame.wikia.com/wiki/Deuterium_Tank
 */
export class DeuteriumTank extends Warehouse {}

DeuteriumTank.prototype.name = name;
DeuteriumTank.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 1000,
});
DeuteriumTank.prototype.baseStorage = Resources.Partial({ deuterium: 10000 });
