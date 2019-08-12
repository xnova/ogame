/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { EnergyTechnology } from '../technologies/EnergyTechnology';

import { Building } from './Building';
import { DeuteriumSynthesizer } from './DeuteriumSynthesizer';

const name = 'Fusion Reactor';
const COST_FACTOR = 1.8;

/**
 * http://ogame.wikia.com/wiki/Fusion_Reactor
 */
export class FusionReactor extends Building {}

FusionReactor.prototype.name = name;
FusionReactor.prototype.baseCost = Resources.Partial({
    metal: 900,
    crystal: 360,
    deuterium: 180,
});
FusionReactor.prototype.costFactor = COST_FACTOR;
FusionReactor.prototype.requirements = [
    new DeuteriumSynthesizer({ level: 5 }),
    new EnergyTechnology({ level: 3 }),
];
