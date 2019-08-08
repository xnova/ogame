/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Warehouse } from './Warehouse';

const name = 'Crystal Storage';

/**
 * http://ogame.wikia.com/wiki/Crystal_Storage
 */
export class CrystalStorage extends Warehouse {}

CrystalStorage.prototype.name = name;
CrystalStorage.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 500,
});
CrystalStorage.prototype.baseStorage = Resources.Partial({ crystal: 10000 });
