/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';
import { RoboticsFactory } from './RoboticsFactory';

const name = 'Shipyard';

/**
 * http://ogame.wikia.com/wiki/Shipyard
 */
export class Shipyard extends Building {}

Shipyard.prototype.name = name;
Shipyard.prototype.baseCost = Resources.Partial({
    metal: 400,
    crystal: 200,
    deuterium: 100,
});
Shipyard.prototype.requirements = [new RoboticsFactory({ level: 2 })];
