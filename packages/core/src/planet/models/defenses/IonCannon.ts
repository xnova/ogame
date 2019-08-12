/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { IonTechnology } from '../technologies/IonTechnology';

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
IonCannon.prototype.requirements = [
    new Shipyard({ level: 4 }),
    new IonTechnology({ level: 4 }),
];
