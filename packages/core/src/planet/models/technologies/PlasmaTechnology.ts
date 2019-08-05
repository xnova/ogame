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
import { IonTechnology } from './IonTechnology';
import { LaserTechnology } from './LaserTechnology';
import { Technology } from './Technology';

const name = 'Plasma Technology';

/**
 * http://ogame.wikia.com/wiki/Plasma_Technology
 */
export class PlasmaTechnology extends Technology {}

PlasmaTechnology.prototype.name = name;
PlasmaTechnology.prototype.baseCost = Resources.Partial({
    metal: 2000,
    crystal: 4000,
    deuterium: 1000,
});
PlasmaTechnology.prototype.requirements = [
    new ResearchLab(4),
    new EnergyTechnology(8),
    new LaserTechnology(10),
    new IonTechnology(5),
];
