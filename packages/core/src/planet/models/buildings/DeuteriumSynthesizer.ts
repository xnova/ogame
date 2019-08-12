/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Mine } from './Mine';

const name = 'Deuterium Synthesizer';
const COST_FACTOR = 1.5;

/**
 * http://ogame.wikia.com/wiki/Deuterium_Synthesizer
 */
export class DeuteriumSynthesizer extends Mine {}

DeuteriumSynthesizer.prototype.name = name;
DeuteriumSynthesizer.prototype.baseCost = Resources.Partial({
    metal: 225,
    crystal: 75,
});
DeuteriumSynthesizer.prototype.costFactor = COST_FACTOR;
DeuteriumSynthesizer.prototype.baseProduction = Resources.Partial({
    deuterium: 10,
    energy: -20,
});
