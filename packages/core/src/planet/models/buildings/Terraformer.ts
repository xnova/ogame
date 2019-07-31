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
import { NaniteFactory } from './NaniteFactory';

const name = 'Terraformer';

/**
 * http://ogame.wikia.com/wiki/Terraformer
 */
export class Terraformer extends Building {}

Terraformer.prototype.id = 'terraformer';
Terraformer.prototype.name = name;
Terraformer.prototype.baseCost = Resources.Partial({
    crystal: 50000,
    deuterium: 100000,
    energy: 1000,
});
Terraformer.prototype.requirements = [
    new NaniteFactory(10),
    new EnergyTechnology(12),
];
