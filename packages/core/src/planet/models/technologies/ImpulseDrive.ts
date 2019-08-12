/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ResearchLab } from '../buildings/ResearchLab';

import { EnergyTechnology } from './EnergyTechnology';
import { Technology } from './Technology';

const name = 'Impulse Drive';

/**
 * http://ogame.wikia.com/wiki/Impulse_Drive
 */
export class ImpulseDrive extends Technology {}

ImpulseDrive.prototype.name = name;
ImpulseDrive.prototype.baseCost = Resources.Partial({
    metal: 2000,
    crystal: 4000,
    deuterium: 600,
});
ImpulseDrive.prototype.requirements = [
    new ResearchLab({ level: 2 }),
    new EnergyTechnology({ level: 1 }),
];
