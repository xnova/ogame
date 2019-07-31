/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { PlasmaTechnology } from '../technologies/PlasmaTechnology';

import { Defense } from './Defense';

const name = 'Plasma Turret';

/**
 * http://ogame.wikia.com/wiki/Plasma_Turret
 */
export class PlasmaTurret extends Defense {}

PlasmaTurret.prototype.name = name;
PlasmaTurret.prototype.cost = Resources.Partial({
    metal: 50000,
    crystal: 50000,
    deuterium: 30000,
});
PlasmaTurret.prototype.requirements = [
    new Shipyard(8),
    new PlasmaTechnology(7),
];
