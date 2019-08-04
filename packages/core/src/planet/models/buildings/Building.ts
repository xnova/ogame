/**
 * Copyright (C) 2017 Rafael Arquero (@arkeros)
 *
 * This file is part of Xnova OGame.
 *
 * This code is licensed under MIT license (see LICENSE.md for details)
 */
import { Technology } from '../technologies/Technology';

export abstract class Building extends Technology {
    public dismantlable: boolean;

    /**
     * http://ogame.wikia.com/wiki/Buildings#Buildings_construction_time
     * Returns the construction time of this building on the given planet.
     */
    public getDurationMs(buildingSpeed: number): number {
        const cost = this.getCost();
        const baseHours = (cost.metal + cost.crystal) / 2500;
        const hours = baseHours / buildingSpeed;
        return hours * 3600 * 1000;
    }
}
Building.prototype.name = 'Unnamed Building';
Building.prototype.dismantlable = true;
Building.prototype.requirements = [];
