/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { Resources } from '../../../shared/resources';

import { Building } from './Building';

export abstract class Warehouse extends Building {
    public baseStorage: Resources;

    /**
     * Resources that can hold this Building
     * https://ogame.fandom.com/wiki/Metal_Storage
     */
    public getStorage(): Resources {
        const { level } = this;
        return this.baseStorage.multiply(
            0.5 * Math.floor(2.5 * Math.exp((20 * level) / 33)),
        );
    }
}
Warehouse.prototype.baseStorage = Resources.Zero();
