/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Defense } from './Defense';

const name = 'Ion Cannon';

/**
 * http://ogame.wikia.com/wiki/Ion_Cannon
 */
export class IonCannon extends Defense {}

IonCannon.prototype.name = name;
IonCannon.prototype.cost = Resources.Partial({
    metal: 2000,
    crystal: 6000,
});
