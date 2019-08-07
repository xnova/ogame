import { AggregateRoot } from '@nestjs/cqrs';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Resources, ResourcesC } from '../../shared/resources';
import { add } from '../../utils';
import { PlayerJoinCommandT } from '../commands';
import {
    BuildCancelledEvent,
    BuildFinishedEvent,
    BuildStartedEvent,
    PlayerJoinedEvent,
} from '../events';
import {
    BuildingTooMuchException,
    PlanetAlreadyBuildingException,
    PlanetNotBuildingException,
    PlanetNotEnoughFieldsException,
    PlanetNotEnoughResourcesException,
    PlanetNotFinishedBuildingException,
    RequirementsAreNotMeetException,
} from '../exceptions';

import {
    Building,
    CrystalMine,
    DeuteriumSynthesizer,
    MetalMine,
    SolarPlant,
} from './buildings';
import { createBuilding } from './createBuilding';
import { Unit } from './defenses/Unit';
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
    fields: t.Int,
    occupiedFields: t.Int,
    construction: t.union([t.null, ConstructionC]),
    buildings: t.record(t.string, t.Int),
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
    public fields: t.Int;
    public occupiedFields: t.Int;
    public construction: ConstructionT | null;
    public buildings: Record<string, t.Int>;

    constructor(public readonly id: UUID) {
        super();
        this.name = '';
        // TODO constant? config?
        this.diameter = 12800 as any;
        // TODO config? Universe?
        this.resources = Resources.Partial({ metal: 500, crystal: 500 });
        this.fields = 163 as any;
        this.occupiedFields = 0 as any;
        this.construction = null;
        this.buildings = {};
    }

    private getBuildingLevel(buildingId: string): number {
        return this.buildings[buildingId] || 0;
    }

    public get<T extends Unit>(type: Type<T>): T {
        if (Technology.isPrototypeOf(type)) {
            return new type(this.getBuildingLevel(type.name));
        }
        return new type();
    }

    /**
     * Resources produced in this planet per hour.
     */
    public getProduction(): Resources {
        let total: Resources;
        // TODO logic
        const productions: Resources[] = [
            this.get(MetalMine).getProduction(),
            this.get(CrystalMine).getProduction(),
            this.get(DeuteriumSynthesizer).getProduction(),
            this.get(SolarPlant).getProduction(),
        ];

        total = Resources.sum(productions);
        if (total.energy < 0) {
            //  energy adjustements
            const positive = Resources.reduce(productions, (acc, x) =>
                add(acc, x > 0 ? x : 0),
            );
            const negative = total.subtract(positive);

            const power = positive.energy;
            const consumption = -negative.energy;
            const productionFactor = Math.min(power / consumption, 1);

            total = Resources.sum([
                positive.multiply(productionFactor),
                negative,
            ]);
        }

        // TODO multiply per speed (UNI?, officers?)
        // TODO apply bonus officers, temperature, plasma tech, items...

        return BASIC_INCOME.add({ ...total, energy: 0 });
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

    public meetsRequirements(unit: Unit): boolean {
        return unit.requirements.every(requirement => {
            if (requirement instanceof Technology) {
                // TODO implement at technology scope, not planet
                const level = this.getBuildingLevel(requirement.id);
                return level >= requirement.level;
            }
            // TODO logic
            return false;
        });
    }

    public join(command: PlayerJoinCommandT) {
        // TODO logic...
        this.apply(new PlayerJoinedEvent(command));
    }

    protected onPlayerJoinedEvent(event: PlayerJoinedEvent) {
        this.temperature = event.payload.temperature;
    }

    public buildStart(building: Building, now: number) {
        // TODO logic...
        if (this.construction) {
            throw new PlanetAlreadyBuildingException();
        }
        if (!this.meetsRequirements(building)) {
            throw new RequirementsAreNotMeetException();
        }
        const currentLevel: number = this.getBuildingLevel(building.id);
        if (building.level !== currentLevel + 1) {
            throw new BuildingTooMuchException();
        }
        if (!this.resources.includes(building.getCost())) {
            throw new PlanetNotEnoughResourcesException();
        }
        if (this.occupiedFields >= this.fields) {
            throw new PlanetNotEnoughFieldsException();
        }

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

    protected onBuildStartedEvent({ payload }: BuildStartedEvent) {
        this.construction = {
            buildingId: payload.buildingId,
            level: payload.level,
            start: payload.start,
            end: payload.end,
        };
        const building = createBuilding(payload.buildingId, payload.level);
        this.withdraw(building.getCost());
    }

    public buildCancel(now: number) {
        // TODO logic...
        const construction = this.construction;
        if (!construction) {
            throw new PlanetNotBuildingException();
        }

        const event = new BuildCancelledEvent({
            ms: now,
            planetId: this.id,
            buildingId: construction.buildingId,
            level: construction.level,
        });
        this.apply(event);
    }

    protected onBuildCancelledEvent({ payload }: BuildCancelledEvent) {
        this.construction = null;
        const building = createBuilding(payload.buildingId, payload.level);
        this.deposit(building.getCost());
    }

    public buildFinish(now: number) {
        // TODO logic...
        const construction = this.construction;
        if (!construction) {
            throw new PlanetNotBuildingException();
        }
        if (now < construction.end) {
            throw new PlanetNotFinishedBuildingException();
        }

        const event = new BuildFinishedEvent({
            ms: now,
            planetId: this.id,
            buildingId: construction.buildingId,
            level: construction.level,
        });
        this.apply(event);
    }

    protected onBuildFinishedEvent({ payload }: BuildFinishedEvent) {
        this.construction = null;
        //  increment fields
        const currentLevel: number = this.getBuildingLevel(payload.buildingId);
        this.occupiedFields += (payload.level - currentLevel) as any;
        this.buildings[payload.buildingId] = payload.level;
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
