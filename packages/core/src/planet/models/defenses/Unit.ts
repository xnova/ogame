/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */

import { Resources } from '../../../shared/resources';
import { Technology } from '../technologies';

export interface Requirement {
    technology: new (level: number) => Technology;
    level: number;
}

export abstract class Unit {
    public id: string; // TODO think better...
    public name: string;
    public requirements: Requirement[];

    public abstract getCost(): Resources;

    public getDurationMs(speed: number): number {
        const cost = this.getCost();
        const baseHours = (cost.metal + cost.crystal) / 2500;
        const hours = baseHours / speed;
        return hours * 3600 * 1000;
    }
}

Unit.prototype.name = 'Unnamed Unit';
Unit.prototype.requirements = [];
