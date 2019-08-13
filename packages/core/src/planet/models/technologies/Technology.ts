/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import * as t from 'io-ts';

import { Resources } from '../../../shared/resources';
import { valueOrThrow } from '../../../shared/types';
import { HOUR } from '../../../utils';
import { InvalidLevelException } from '../../exceptions';
import { Unit } from '../defenses/Unit';

const DEFAULT_COST_FACTOR = 2;
const STRUCURAL_INTEGRITY_PER_HOUR = 1000;

export abstract class Technology extends Unit {
    public readonly level: t.Int;
    public baseCost: Resources;
    public costFactor: number;

    constructor({ level }: { level: number }) {
        super();
        if (level < 0) {
            throw new InvalidLevelException();
        }
        this.level = valueOrThrow(t.Int)(level);
    }

    /**
     * http://ogame.wikia.com/wiki/Building#Facilities_cost
     */
    public getCost(): Resources {
        const { level, costFactor: k } = this;
        return this.baseCost.map(b => Math.floor(b * k ** (level - 1)));
    }

    /**
     * https://www.wolframalpha.com/input/?i=sum+b+*+k+%5E+l+from+l%3D1+to+n
     */
    public getAccumulatedCost(): Resources {
        const { level, costFactor: k } = this;
        return this.baseCost.map(b => (b * k * (k ** level - 1)) / (k - 1));
    }

    /**
     * https://ogame.fandom.com/wiki/Research
     */
    public getDurationMs(researchSpeed: number): number {
        const cost = this.getCost();
        const structuralIntegrity = cost.metal + cost.crystal;
        const baseHours = structuralIntegrity / STRUCURAL_INTEGRITY_PER_HOUR;
        const hours = baseHours / researchSpeed;
        return hours * HOUR;
    }
}

Technology.prototype.name = 'Unnamed Technology';
Technology.prototype.baseCost = Resources.Partial({ metal: 1, crystal: 1 });
Technology.prototype.costFactor = DEFAULT_COST_FACTOR;
