import { AggregateRoot } from '@nestjs/cqrs';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Resources, ResourcesC } from '../../shared/resources';
import { PlayerJoinCommandT } from '../commands';
import {
    BuildCancelledEvent,
    BuildStartedEvent,
    PlayerJoinedEvent,
} from '../events';

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

export type PlanetEvent =
    | PlayerJoinedEvent
    | BuildStartedEvent
    | BuildCancelledEvent;

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

    private produce(ms: number): void {
        if (ms === 0) {
            return;
        }
        // TODO speed production
        const hours: number = ms / 1000 / 3600;
        const production = this.getProduction();
        this.resources = this.resources.map(
            (amount, resource) => amount + hours * production[resource],
        );
        // TODO cap by storage
    }

    public deposit(resources: Resources): void {
        this.resources = this.resources.add(resources);
    }

    public withdraw(resources: Resources): void {
        this.resources = this.resources.subtract(resources);
    }

    public join(command: PlayerJoinCommandT) {
        // TODO logic...
        this.apply(new PlayerJoinedEvent(command));
    }

    private onPlayerJoinedEvent(event: PlayerJoinedEvent) {
        this.temperature = event.payload.temperature;
    }

    public buildStart(building: Building) {
        // TODO logic...
        if (this.construction) {
            // TODO better errors
            throw new Error('Planet already under construction');
        }
        if (building.level < 0) {
            throw new Error('Cannot build negative levels');
        }
        // TODO fetch from construction.buildingId
        const current = this.get(MetalMine);
        if (building.level !== current.level + 1) {
            throw new Error('Can only improve level one by one');
        }

        const now = Date.now(); // TODO ClockService
        const buildingSpeed = 1; // TODO universe, robots, nanite
        const event = new BuildStartedEvent({
            ms: now,
            planetId: this.id,
            buildingId: building.id,
            level: building.level,
            start: now,
            end: now + building.getDurationMs(buildingSpeed),
        });
        this.apply(event);
    }

    private onBuildStartedEvent(event: BuildStartedEvent) {
        this.construction = {
            buildingId: event.payload.buildingId,
            level: event.payload.level,
            start: event.payload.start,
            end: event.payload.end,
        };
        // TODO fetch from construction.buildingId and level
        const building = new MetalMine(event.payload.level);
        this.withdraw(building.getCost());
    }

    public buildCancel() {
        // TODO logic...
        const now = Date.now(); // TODO ClockService
        const construction = this.construction;
        if (!construction) {
            throw new Error('Planet not under construction');
        }

        const event = new BuildCancelledEvent({
            ms: now,
            planetId: this.id,
            buildingId: construction.buildingId,
            level: construction.level,
        });
        this.apply(event);
    }

    private onBuildCancelledEvent(event: BuildCancelledEvent) {
        this.construction = null;
        // TODO fetch from construction.buildingId and level
        const building = new MetalMine(event.payload.level);
        this.deposit(building.getCost());
    }

    public loadFromHistory(history: PlanetEvent[], now: number = Date.now()) {
        if (history.length === 0) {
            return;
        }

        let lastUpdate: number;
        const firstEvent = history[0];
        lastUpdate = firstEvent.payload.ms;

        for (const event of history) {
            // produce
            const then: number = event.payload.ms;
            // TODO do not rely on ms payload...
            this.produce(then - lastUpdate);
            lastUpdate = then;

            // process event from history
            this.apply(event, true);
        }

        // produce resources until NOW
        this.produce(now - lastUpdate);
        lastUpdate = now;
    }
}
