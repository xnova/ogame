/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Missile Silo';

/**
 * http://ogame.wikia.com/wiki/Missile_Silo
 */
export class MissileSilo extends Building {}

MissileSilo.prototype.id = 'silo';
MissileSilo.prototype.name = name;
MissileSilo.prototype.baseCost = Resources.Partial({
    metal: 20000,
    crystal: 20000,
    deuterium: 1000,
});
