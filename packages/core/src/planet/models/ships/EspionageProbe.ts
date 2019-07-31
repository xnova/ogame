/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Shipyard } from '../buildings/Shipyard';
import { CombustionDrive } from '../technologies/CombustionDrive';
import { EspionageTechnology } from '../technologies/EspionageTechnology';

import { Ship } from './Ship';

const name = 'Espionage Probe';

/**
 * http://ogame.wikia.com/wiki/Espionage_Probe
 */
export class EspionageProbe extends Ship {}

EspionageProbe.prototype.name = name;
EspionageProbe.prototype.cost = Resources.Partial({
    crystal: 1000,
});
EspionageProbe.prototype.requirements = [
    new Shipyard(3),
    new CombustionDrive(3),
    new EspionageTechnology(2),
];
