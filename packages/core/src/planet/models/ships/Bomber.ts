/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { ImpulseDrive } from '../technologies/ImpulseDrive';
import { PlasmaTechnology } from '../technologies/PlasmaTechnology';

import { Ship } from './Ship';

const name = 'Bomber';

/**
 * http://ogame.wikia.com/wiki/Bomber
 */
export class Bomber extends Ship {}

Bomber.prototype.name = name;
Bomber.prototype.cost = Resources.Partial({
    metal: 50000,
    crystal: 25000,
    deuterium: 15000,
});
Bomber.prototype.requirements = [
    new ImpulseDrive({ level: 6 }),
    new Shipyard({ level: 8 }),
    new PlasmaTechnology({ level: 5 }),
];
