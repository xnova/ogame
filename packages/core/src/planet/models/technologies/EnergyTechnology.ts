/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Energy Technology';

/**
 * http://ogame.wikia.com/wiki/Energy_Technology
 */
export class EnergyTechnology extends Technology {}

EnergyTechnology.prototype.id = 'energyTech';
EnergyTechnology.prototype.name = name;
EnergyTechnology.prototype.baseCost = Resources.Partial({
    crystal: 800,
    deuterium: 400,
});
