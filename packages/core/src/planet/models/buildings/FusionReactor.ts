/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';

import { Building } from './Building';

const name = 'Fusion Reactor';

/**
 * http://ogame.wikia.com/wiki/Fusion_Reactor
 */
export class FusionReactor extends Building {}

FusionReactor.prototype.id = 'fusionReactor';
FusionReactor.prototype.name = name;
FusionReactor.prototype.baseCost = Resources.Partial({
    metal: 900,
    crystal: 360,
    deuterium: 180,
});
FusionReactor.prototype.costFactor = 1.8;
