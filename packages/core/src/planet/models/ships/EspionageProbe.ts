/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Ship } from './Ship';

const name = 'Espionage Probe';

/**
 * http://ogame.wikia.com/wiki/Espionage_Probe
 */
export class EspionageProbe extends Ship {}

EspionageProbe.prototype.name = name;
EspionageProbe.prototype.cost = Resources.Partial({
    metal: 1000,
});
