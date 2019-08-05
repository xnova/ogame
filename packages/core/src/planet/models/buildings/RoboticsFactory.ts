/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Robotics Factory';

/**
 * http://ogame.wikia.com/wiki/Robotics_Factory
 */
export class RoboticsFactory extends Building {}

RoboticsFactory.prototype.name = name;
RoboticsFactory.prototype.baseCost = Resources.Partial({
    metal: 400,
    crystal: 120,
    deuterium: 200,
});
