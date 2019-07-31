/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Defense } from './Defense';

const name = 'Rocket Launcher';

/**
 * http://ogame.wikia.com/wiki/Rocket_Launcher
 */
export class RocketLauncher extends Defense {}

RocketLauncher.prototype.name = name;
RocketLauncher.prototype.cost = Resources.Partial({
    metal: 2000,
});
