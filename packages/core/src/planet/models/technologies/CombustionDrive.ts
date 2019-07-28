/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Combustion Drive';

/**
 * http://ogame.wikia.com/wiki/Combustion_Drive
 */
export class CombustionDrive extends Technology {}

CombustionDrive.prototype.id = 'combustionDrive';
CombustionDrive.prototype.name = name;
CombustionDrive.prototype.baseCost = Resources.Partial({
    metal: 400,
    crystal: 600,
});
