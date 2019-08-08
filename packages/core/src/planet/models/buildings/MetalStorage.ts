/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Warehouse } from './Warehouse';

const name = 'Metal Storage';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 */
export class MetalStorage extends Warehouse {}

MetalStorage.prototype.name = name;
MetalStorage.prototype.baseCost = Resources.Partial({
    metal: 1000,
});
MetalStorage.prototype.baseStorage = Resources.Partial({ metal: 10000 });
