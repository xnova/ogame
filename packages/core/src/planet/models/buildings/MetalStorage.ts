/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Metal Storage';

/**
 * http://ogame.wikia.com/wiki/Metal_Storage
 */
export class MetalStorage extends Building {}

MetalStorage.prototype.id = 'metalStorage';
MetalStorage.prototype.name = name;
MetalStorage.prototype.baseCost = Resources.Partial({
    metal: 1000,
});
