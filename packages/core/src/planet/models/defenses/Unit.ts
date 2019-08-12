/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { Resources } from '../../../shared/resources';
import { HOUR } from '../../../utils';

const STRUCURAL_INTEGRITY_PER_HOUR = 2500;

export abstract class Unit {
    public name: string;
    public requirements: Unit[];

    public get id(): string {
        return this.constructor.name;
    }

    public abstract getCost(): Resources;

    public getDurationMs(speed: number): number {
        const cost = this.getCost();
        const structuralIntegrity = cost.metal + cost.crystal;
        const baseHours = structuralIntegrity / STRUCURAL_INTEGRITY_PER_HOUR;
        const hours = baseHours / speed;
        return hours * HOUR;
    }
}

Unit.prototype.name = 'Unnamed Unit';
Unit.prototype.requirements = [];
