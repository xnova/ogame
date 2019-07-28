/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Nanite Factory';

/**
 * http://ogame.wikia.com/wiki/Nanite_Factory
 */
export class NaniteFactory extends Building {}

NaniteFactory.prototype.id = 'naniteFactory';
NaniteFactory.prototype.name = name;
NaniteFactory.prototype.baseCost = Resources.Partial({
    metal: 1000000,
    crystal: 500000,
    deuterium: 100000,
});
