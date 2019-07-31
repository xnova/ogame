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

import { Ship } from './Ship';

const name = 'Colony Ship';

/**
 * http://ogame.wikia.com/wiki/Colony_Ship
 */
export class ColonyShip extends Ship {}

ColonyShip.prototype.name = name;
ColonyShip.prototype.cost = Resources.Partial({
    metal: 10000,
    crystal: 20000,
    deuterium: 10000,
});
ColonyShip.prototype.requirements = [new Shipyard(4), new ImpulseDrive(3)];
