/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Impulse Drive';

/**
 * http://ogame.wikia.com/wiki/Impulse_Drive
 */
export class ImpulseDrive extends Technology {}

ImpulseDrive.prototype.id = 'impulseDrive';
ImpulseDrive.prototype.name = name;
ImpulseDrive.prototype.baseCost = Resources.Partial({
    metal: 2000,
    crystal: 4000,
    deuterium: 600,
});
