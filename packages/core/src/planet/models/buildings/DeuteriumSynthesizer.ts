/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Deuterium Synthesizer';

/**
 * http://ogame.wikia.com/wiki/Deuterium_Synthesizer
 */
export class DeuteriumSynthesizer extends Building {}

DeuteriumSynthesizer.prototype.id = 'deuteriumSynthesizer';
DeuteriumSynthesizer.prototype.name = name;
DeuteriumSynthesizer.prototype.baseCost = Resources.Partial({
    metal: 225,
    crystal: 75,
});
DeuteriumSynthesizer.prototype.costFactor = 1.5;
