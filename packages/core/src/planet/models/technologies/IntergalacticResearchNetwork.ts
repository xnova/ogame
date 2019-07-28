/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Technology } from './Technology';

const name = 'Intergalactic Research Network';

/**
 * http://ogame.wikia.com/wiki/Intergalactic_Research_Network
 */
export class IntergalacticResearchNetwork extends Technology {}

IntergalacticResearchNetwork.prototype.id = 'IRN';
IntergalacticResearchNetwork.prototype.name = name;
IntergalacticResearchNetwork.prototype.baseCost = Resources.Partial({
    metal: 240000,
    crystal: 400000,
    deuterium: 160000,
});
