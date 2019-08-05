/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Metal Mine';

/**
 * http://ogame.wikia.com/wiki/Metal_Mine
 */
export class MetalMine extends Building {}

MetalMine.prototype.name = name;
MetalMine.prototype.baseCost = Resources.Partial({
    metal: 60,
    crystal: 15,
});
MetalMine.prototype.costFactor = 1.5;
