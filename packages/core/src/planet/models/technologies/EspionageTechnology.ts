/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Espionage Technology';

/**
 * http://ogame.wikia.com/wiki/Espionage_Technology
 */
export class EspionageTechnology extends Technology {}

EspionageTechnology.prototype.id = 'espionageTech';
EspionageTechnology.prototype.name = name;
EspionageTechnology.prototype.baseCost = Resources.Partial({
    metal: 200,
    crystal: 1000,
    deuterium: 200,
});
