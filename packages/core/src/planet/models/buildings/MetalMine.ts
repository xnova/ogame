/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Mine } from './Mine';

const name = 'Metal Mine';
const COST_FACTOR = 1.5;

/**
 * http://ogame.wikia.com/wiki/Metal_Mine
 */
export class MetalMine extends Mine {}

MetalMine.prototype.name = name;
MetalMine.prototype.baseCost = Resources.Partial({
    metal: 60,
    crystal: 15,
});
MetalMine.prototype.costFactor = COST_FACTOR;
MetalMine.prototype.baseProduction = Resources.Partial({
    metal: 30,
    energy: -10,
});
