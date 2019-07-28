/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Computer Technology';

/**
 * http://ogame.wikia.com/wiki/Computer_Technology
 */
export class ComputerTechnology extends Technology {}

ComputerTechnology.prototype.id = 'computerTech';
ComputerTechnology.prototype.name = name;
ComputerTechnology.prototype.baseCost = Resources.Partial({
    crystal: 400,
    deuterium: 600,
});
