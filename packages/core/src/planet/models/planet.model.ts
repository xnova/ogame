import { AggregateRoot } from '@nestjs/cqrs';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Resources, ResourcesC } from '../../shared/resources';
import { valueOrThrow } from '../../shared/types';
import { clamp, HOUR, lerp } from '../../utils';
import { PlayerJoinCommandT } from '../commands';
import {
    BuildCancelledEvent,
    BuildFinishedEvent,
    BuildStartedEvent,
    PlayerJoinedEvent,
    ResearchCancelledEvent,
    ResearchFinishedEvent,
    ResearchStartedEvent,
    ShipyardFinishedEvent,
    ShipyardStartedEvent,
} from '../events';
import {
    InvalidLevelException,
    PlanetAlreadyBusyException,
    PlanetNotBusyException,
    PlanetNotEnoughFieldsException,
    PlanetNotEnoughResourcesException,
    PlanetNotFinishedException,
    RequirementsAreNotMeetException,
    TooMuchLevelException,
} from '../exceptions';

import {
    Building,
    CrystalMine,
    CrystalStorage,
    DeuteriumSynthesizer,
    DeuteriumTank,
    MetalMine,
    MetalStorage,
    NaniteFactory,
    ResearchLab,
    RoboticsFactory,
    Shipyard,
    SolarPlant,
} from './buildings';
import { Warehouse } from './buildings/Warehouse';
import { createBuilding } from './createBuilding';
import { createTechnology } from './createTechnology';
import { createUnit } from './createUnit';
import { ShipyardUnit } from './defenses/ShipyardUnit';
import { Unit } from './defenses/Unit';
import { Technology } from './technologies';

const ConstructionC = t.type({
    id: t.string,
    level: t.Int,
    start: t.number,
    end: t.number,
});

type ConstructionT = t.TypeOf<typeof ConstructionC>;

// TODO abstract construction & shipyard???
const ShipyardC = t.type({
    id: t.string,
    quantity: t.Int,
    start: t.number,
    end: t.number,
});

type ShipyardT = t.TypeOf<typeof ShipyardC>;

export const PlanetC = t.type({
    id: UUID,
    name: t.string,
    diameter: t.Int,
    temperature: t.Int,
    resources: ResourcesC,
    fields: t.Int,
    occupiedFields: t.Int,
    construction: t.union([t.null, ConstructionC]),
    research: t.union([t.null, ConstructionC]),
    levels: t.record(t.string, t.Int),
    quantities: t.record(t.string, t.Int),
});

export type PlanetT = t.TypeOf<typeof PlanetC>;

const DEFAULT_DIAMETER = 12800;
const DEFAULT_FIELDS = 163;
const BASIC_INCOME: Resources = Resources.Partial({ metal: 45, crystal: 15 });
const WAREHOUSES: Array<Type<Warehouse>> = [
    MetalStorage,
    CrystalStorage,
    DeuteriumTank,
];

export const int = valueOrThrow(t.Int);

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
    public productionFactor: number;
    public fields: t.Int;
    public occupiedFields: t.Int;
    public construction: ConstructionT | null;
    public research: ConstructionT | null;
    public shipyard: ShipyardT | null;
    public levels: Record<string, t.Int>;
    public quantities: Record<string, t.Int>;

    constructor(public readonly id: UUID) {
        super();
        this.name = '';
        // TODO constant? config?
        this.diameter = int(DEFAULT_DIAMETER);
        // TODO config? Universe?
        this.resources = Resources.Partial({ metal: 500, crystal: 500 });
        this.fields = int(DEFAULT_FIELDS);
        this.occupiedFields = 0 as any;
        this.construction = null;
        this.research = null;
        this.shipyard = null;
        this.levels = {};
        this.quantities = {};
    }

    private getLevel(buildingId: string): t.Int {
        return this.levels[buildingId] || int(0);
    }

    private getQuantity(id: string): t.Int {
        return this.quantities[id] || int(0);
    }

    public get<T extends Unit>(type: Type<T>): T {
        if (Technology.isPrototypeOf(type)) {
            return new type({ level: this.getLevel(type.name) });
        }
        return new type();
    }

    /**
     * Resources produced in this planet per hour.
     */
    public getProduction(): Resources {
        const ENERGY_PER_SAT: number = 50;
        const solarStalliteEfficiency = clamp(
            // tslint:disable-next-line: no-magic-numbers
            (this.temperature - -160) / 300,
            0,
            1,
        );
        const positive = Resources.sum([
            this.get(SolarPlant).getProduction(),
            // TODO better
            Resources.Partial({
                energy:
                    ENERGY_PER_SAT *
                    solarStalliteEfficiency *
                    this.getQuantity('SolarSatellite'),
            }),
            // TODO FusionReactor
        ]);
        const negative = Resources.sum([
            this.get(MetalMine).getProduction(),
            this.get(CrystalMine).getProduction(),
            this.get(DeuteriumSynthesizer).getProduction(),
        ]);

        const power = positive.energy;
        const consumption = -negative.energy;
        this.productionFactor =
            consumption > 0 ? Math.min(power / consumption, 1) : 0;

        const total = Resources.sum([
            negative.multiply(this.productionFactor),
            positive,
        ]);

        // TODO multiply per speed (UNI?, officers?)
        // TODO apply bonus officers, temperature, plasma tech, items...

        return BASIC_INCOME.add({ ...total, energy: 0 });
    }

    public getStorage(): Resources {
        return Resources.sum(
            WAREHOUSES.map(type => this.get(type).getStorage()),
        );
    }

    private produce(ms: number): void {
        if (ms === 0) {
            return;
        }
        // TODO speed production
        const hours: number = ms / HOUR;
        const production: Resources = this.getProduction();
        const storage: Resources = this.getStorage();
        this.resources = this.resources.map((amount, resource) =>
            // cap by storage
            clamp(
                amount + hours * production[resource],
                amount,
                storage[resource],
            ),
        );
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
                const level = this.getLevel(requirement.id);
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
        // logic...
        if (this.construction) {
            throw new PlanetAlreadyBusyException();
        }
        if (!this.meetsRequirements(building)) {
            throw new RequirementsAreNotMeetException();
        }
        const currentLevel: number = this.getLevel(building.id);
        if (building.level !== currentLevel + 1) {
            throw new TooMuchLevelException();
        }
        if (!this.resources.includes(building.getCost())) {
            throw new PlanetNotEnoughResourcesException();
        }
        if (this.occupiedFields >= this.fields) {
            throw new PlanetNotEnoughFieldsException();
        }

        // TODO universe, robots, nanite
        const baseNaniteSpeed = 2;
        const buildingSpeed =
            (1 + this.get(RoboticsFactory).level) *
            Math.pow(baseNaniteSpeed, this.get(NaniteFactory).level);
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
            id: payload.buildingId,
            level: payload.level,
            start: payload.start,
            end: payload.end,
        };
        const building = createBuilding(payload.buildingId, payload.level);
        this.withdraw(building.getCost());
    }

    public buildCancel(now: number) {
        // logic...
        const construction = this.construction;
        if (!construction) {
            throw new PlanetNotBusyException();
        }

        const event = new BuildCancelledEvent({
            ms: now,
            planetId: this.id,
            buildingId: construction.id,
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
        // logic...
        const construction = this.construction;
        if (!construction) {
            throw new PlanetNotBusyException();
        }
        if (now < construction.end) {
            throw new PlanetNotFinishedException();
        }

        const event = new BuildFinishedEvent({
            ms: now,
            planetId: this.id,
            buildingId: construction.id,
            level: construction.level,
        });
        this.apply(event);
    }

    protected onBuildFinishedEvent({ payload }: BuildFinishedEvent) {
        this.construction = null;
        //  increment fields
        const currentLevel: number = this.getLevel(payload.buildingId);
        this.occupiedFields += (payload.level - currentLevel) as any;
        this.levels[payload.buildingId] = payload.level;
    }

    public researchStart(technology: Technology, now: number) {
        // logic...
        if (this.research) {
            throw new PlanetAlreadyBusyException('researching');
        }
        if (!this.meetsRequirements(technology)) {
            throw new RequirementsAreNotMeetException();
        }
        const currentLevel: number = this.getLevel(technology.id);
        if (technology.level !== currentLevel + 1) {
            throw new TooMuchLevelException();
        }
        if (!this.resources.includes(technology.getCost())) {
            throw new PlanetNotEnoughResourcesException();
        }

        // TODO universe, lab, irn
        const researchSpeed = 1 + this.get(ResearchLab).level;
        const duration = technology.getDurationMs(researchSpeed);
        const event = new ResearchStartedEvent({
            ms: now,
            planetId: this.id,
            techId: technology.id,
            level: technology.level,
            start: now,
            end: now + duration,
        });
        this.apply(event);
    }

    protected onResearchStartedEvent({ payload }: ResearchStartedEvent) {
        this.research = {
            id: payload.techId,
            level: payload.level,
            start: payload.start,
            end: payload.end,
        };
        const technology = createTechnology(payload.techId, payload.level);
        this.withdraw(technology.getCost());
    }

    public researchCancel(now: number) {
        // logic...
        const research = this.research;
        if (!research) {
            throw new PlanetNotBusyException('researching');
        }

        const event = new ResearchCancelledEvent({
            ms: now,
            planetId: this.id,
            techId: research.id,
            level: research.level,
        });
        this.apply(event);
    }

    protected onResearchCancelledEvent({ payload }: ResearchCancelledEvent) {
        this.research = null;
        const technology = createTechnology(payload.techId, payload.level);
        this.deposit(technology.getCost());
    }

    public researchFinish(now: number) {
        // logic...
        const research = this.research;
        if (!research) {
            throw new PlanetNotBusyException('researching');
        }
        if (now < research.end) {
            throw new PlanetNotFinishedException('researching');
        }
        const event = new ResearchFinishedEvent({
            ms: now,
            planetId: this.id,
            techId: research.id,
            level: research.level,
        });
        this.apply(event);
    }

    protected onResearchFinishedEvent({ payload }: ResearchFinishedEvent) {
        this.research = null;
        this.levels[payload.techId] = payload.level;
    }

    public shipyardStart(unit: ShipyardUnit, quantity: t.Int, now: number) {
        // logic...
        if (quantity < 1) {
            // TODO not really level, its a quantity
            throw new InvalidLevelException();
        }
        if (this.shipyard) {
            throw new PlanetAlreadyBusyException();
        }
        if (!this.meetsRequirements(unit)) {
            throw new RequirementsAreNotMeetException();
        }
        if (this.getQuantity(unit.id) + quantity > unit.max) {
            // TODO not really level, its a quantit
            throw new TooMuchLevelException();
        }
        const cost = unit.getCost().multiply(quantity);
        if (!this.resources.includes(cost)) {
            throw new PlanetNotEnoughResourcesException();
        }

        // TODO universe, shipyard, nanite
        const baseNaniteSpeed = 2;
        const shipyardSpeed =
            (1 + this.get(Shipyard).level) *
            Math.pow(baseNaniteSpeed, this.get(NaniteFactory).level);
        const duration = (HOUR * quantity) / shipyardSpeed; // TODO force var(quantity, unit) by tests
        const event = new ShipyardStartedEvent({
            ms: now,
            planetId: this.id,
            unitId: unit.id,
            quantity,
            start: now,
            end: now + duration,
        });
        this.apply(event);
    }

    protected onShipyardStartedEvent({ payload }: ShipyardStartedEvent) {
        this.shipyard = {
            id: payload.unitId,
            quantity: payload.quantity,
            start: payload.start,
            end: payload.end,
        };
        const unit = createUnit(payload.unitId);
        const cost = unit.getCost().multiply(payload.quantity);
        this.withdraw(cost);
    }

    public shipyardFinish(now: number) {
        // logic...
        const shipyard = this.shipyard;
        if (!shipyard) {
            throw new PlanetNotBusyException();
        }
        if (now < shipyard.end) {
            throw new PlanetNotFinishedException();
        }
        const event = new ShipyardFinishedEvent({
            ms: now,
            planetId: this.id,
            unitId: shipyard.id,
            quantity: shipyard.quantity,
        });
        this.apply(event);
    }

    protected onShipyardFinishedEvent({
        payload: { unitId, quantity },
    }: ShipyardFinishedEvent) {
        this.shipyard = null;
        this.quantities[unitId] = (this.getQuantity(unitId) + quantity) as any;
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

        // produce ships until NOW (LERP)
        const { shipyard } = this;
        if (shipyard) {
            const duration = shipyard.end - shipyard.start;
            const elapsed = now - shipyard.start;
            const v0 = this.getQuantity(shipyard.id);
            const v1 = v0 + shipyard.quantity;
            const p = clamp(elapsed / duration, 0, 1);
            this.quantities[shipyard.id] = Math.floor(lerp(v0, v1, p)) as any;
        }
    }
}
