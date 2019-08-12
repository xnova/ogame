/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { HOUR } from '../../../utils';
import { Technology } from '../technologies/Technology';

const STRUCURAL_INTEGRITY_PER_HOUR = 2500;

export abstract class Building extends Technology {
    public dismantlable: boolean;

    /**
     * http://ogame.wikia.com/wiki/Buildings#Buildings_construction_time
     * Returns the construction time of this building on the given planet.
     */
    public getDurationMs(buildingSpeed: number): number {
        const cost = this.getCost();
        const structuralIntegrity = cost.metal + cost.crystal;
        const baseHours = structuralIntegrity / STRUCURAL_INTEGRITY_PER_HOUR;
        const hours = baseHours / buildingSpeed;
        return hours * HOUR;
    }
}
Building.prototype.name = 'Unnamed Building';
Building.prototype.dismantlable = true;
Building.prototype.requirements = [];
