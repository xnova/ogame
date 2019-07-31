/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { EnergyTechnology } from '../technologies/EnergyTechnology';
import { ShieldingTechnology } from '../technologies/ShieldingTechnology';
import { WeaponsTechnology } from '../technologies/WeaponsTechnology';

import { Defense } from './Defense';

const name = 'Gauss Cannon';

/**
 * http://ogame.wikia.com/wiki/Gauss_Cannon
 */
export class GaussCannon extends Defense {}

GaussCannon.prototype.name = name;
GaussCannon.prototype.cost = Resources.Partial({
    metal: 20000,
    crystal: 15000,
    deuterium: 2000,
});
GaussCannon.prototype.requirements = [
    new Shipyard(6),
    new EnergyTechnology(6),
    new WeaponsTechnology(3),
    new ShieldingTechnology(1),
];
