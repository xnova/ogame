/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Ion Technology';

/**
 * http://ogame.wikia.com/wiki/Ion_Technology
 */
export class IonTechnology extends Technology {}

IonTechnology.prototype.id = 'ionTech';
IonTechnology.prototype.name = name;
IonTechnology.prototype.baseCost = Resources.Partial({
    metal: 1000,
    crystal: 300,
    deuterium: 100,
});
