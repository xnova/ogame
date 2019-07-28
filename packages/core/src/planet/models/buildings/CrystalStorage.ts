/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Crystal Storage';

/**
 * http://ogame.wikia.com/wiki/Crystal_Storage
 */
export class CrystalStorage extends Building {}

CrystalStorage.prototype.id = 'crystalStorage';
CrystalStorage.prototype.name = name;
CrystalStorage.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 500,
});
