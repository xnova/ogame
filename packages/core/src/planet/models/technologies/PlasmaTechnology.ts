/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Plasma Technology';

/**
 * http://ogame.wikia.com/wiki/Plasma_Technology
 */
export class PlasmaTechnology extends Technology {}

PlasmaTechnology.prototype.id = 'plasmaTech';
PlasmaTechnology.prototype.name = name;
PlasmaTechnology.prototype.baseCost = Resources.Partial({
    metal: 2000,
    crystal: 4000,
    deuterium: 1000,
});
