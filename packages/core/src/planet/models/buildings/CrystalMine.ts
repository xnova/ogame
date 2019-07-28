/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Crystal Mine';

/**
 * http://ogame.wikia.com/wiki/Crystal_Mine
 */
export class CrystalMine extends Building {}

CrystalMine.prototype.id = 'crystalMine';
CrystalMine.prototype.name = name;
CrystalMine.prototype.baseCost = Resources.Partial({
    metal: 48,
    crystal: 24,
});
CrystalMine.prototype.costFactor = 1.6;
