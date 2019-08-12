/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { Resources } from '../../../shared/resources';

import { Building } from './Building';

export abstract class Mine extends Building {
    public baseProduction: Resources;

    /**
     * Resources produced by this Mine per hour.
     */
    public getProduction(): Resources {
        const { level } = this;
        // tslint:disable-next-line: no-magic-numbers
        return this.baseProduction.multiply(level * Math.pow(1.1, level));
    }
}
Mine.prototype.baseProduction = Resources.Zero();
