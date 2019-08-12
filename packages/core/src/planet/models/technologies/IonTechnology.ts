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
import { LaserTechnology } from './LaserTechnology';
import { Technology } from './Technology';

const name = 'Ion Technology';

/**
 * http://ogame.wikia.com/wiki/Ion_Technology
 */
export class IonTechnology extends Technology {}

IonTechnology.prototype.name = name;
IonTechnology.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 300,
    deuterium: 100,
});
IonTechnology.prototype.requirements = [
    new ResearchLab({ level: 4 }),
    new LaserTechnology({ level: 5 }),
    new EnergyTechnology({ level: 4 }),
];
