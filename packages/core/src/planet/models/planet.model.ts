import { AggregateRoot } from '@nestjs/cqrs';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Resources, ResourcesC } from '../../shared/resources';
import { PlayerJoinCommandT } from '../commands';
import { BuildStartedEvent, PlayerJoinedEvent } from '../events';

import {
    Building,
    CrystalMine,
    DeuteriumSynthesizer,
    MetalMine,
} from './buildings';
import { Technology } from './technologies';

const ConstructionC = t.type({
    buildingId: t.string,
    level: t.Int,
    start: t.number,
    end: t.number,
});

type ConstructionT = t.TypeOf<typeof ConstructionC>;

export const PlanetC = t.type({
    id: UUID,
    name: t.string,
    diameter: t.Int,
    temperature: t.Int,
    resources: ResourcesC,
    construction: t.union([t.null, ConstructionC]),
});

export type PlanetT = t.TypeOf<typeof PlanetC>;

const BASIC_INCOME: Resources = Resources.Partial({ metal: 45, crystal: 15 });

export type Type<T> = new (...args: any[]) => T;

export class PlanetModel extends AggregateRoot implements PlanetT {
    public name: string;
    public diameter: t.Int;
    public temperature: t.Int;
    public resources: Resources;
    public construction: ConstructionT | null;

    constructor(public readonly id: UUID) {
        super();
        this.name = '';
        // TODO constant? config?
        this.diameter = 12800 as any;
        // TODO config? Universe?
        this.resources = Resources.Partial({ metal: 500, crystal: 500 });
        this.construction = null;
    }

    public get<T = any>(type: Type<T>): T {
        if (Technology.isPrototypeOf(type)) {
            return new type(0);
        }
        return new type();
    }

    /**
     * Resources produced in this planet per hour.
     */
    public getProduction(): Resources {
        const metalMine = this.get(MetalMine);
        const crystalMine = this.get(CrystalMine);
        const deuteriumMine = this.get(DeuteriumSynthesizer);
        return BASIC_INCOME;
    }

    public produce(ms: number): void {
        // TODO speed production
        const hours: number = ms / 1000 / 3600;
        const production = this.getProduction();
        this.resources = this.resources.map(
            (amount, resource) => amount + hours * production[resource],
        );
        // TODO cap by storage
    }

    public withdraw(resources: Resources): void {
        this.resources = this.resources.subtract(resources);
    }

    public join(command: PlayerJoinCommandT) {
        // TODO logic...
        this.apply(new PlayerJoinedEvent(command));
    }

    public buildStart(building: Building) {
        // TODO logic...
        if (this.construction) {
            // TODO better errors
            throw new Error('Planet already under construction');
        }

        const now = Date.now(); // TODO ClockService
        const buildingSpeed = 1; // TODO universe, robots, nanite
        this.construction = {
            buildingId: building.id,
            level: building.level,
            start: now,
            end: now + building.getDurationMs(buildingSpeed),
        };
        this.withdraw(building.getCost());

        const event = new BuildStartedEvent({
            ms: now,
            planetId: this.id,
            buildingId: building.id,
            level: building.level,
            start: this.construction.start,
            end: this.construction.end,
        });
        this.apply(event);
    }
}
