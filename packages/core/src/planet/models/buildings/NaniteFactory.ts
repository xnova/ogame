/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { ComputerTechnology } from '../technologies/ComputerTechnology';

import { Building } from './Building';
import { RoboticsFactory } from './RoboticsFactory';

const name = 'Nanite Factory';

/**
 * http://ogame.wikia.com/wiki/Nanite_Factory
 */
export class NaniteFactory extends Building {}

NaniteFactory.prototype.id = 'naniteFactory';
NaniteFactory.prototype.name = name;
NaniteFactory.prototype.baseCost = Resources.Partial({
    metal: 1000000,
    crystal: 500000,
    deuterium: 100000,
});
NaniteFactory.prototype.requirements = [
    new RoboticsFactory(10),
    new ComputerTechnology(10),
];
