import {
    CommandBus,
    CqrsModule,
    EventBus,
    ICommand,
    IEvent,
} from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UUID } from 'io-ts-types/lib/UUID';

import { Clock } from '../src/planet/clock';
import { PlayerJoinCommand } from '../src/planet/commands';
import {
    BuildFinishedEvent,
    ResearchFinishedEvent,
    ShipyardFinishedEvent,
} from '../src/planet/events';
import { CommandHandlers } from '../src/planet/handlers';
import { PlanetRepository } from '../src/planet/planet.repository';
import { PointT } from '../src/shared/Point';

import { MemoryPlanetRepository } from './memory-planet.repository';
import { TimeTravelClock } from './TimeTravelClock';
import { generateUUID, int, niceError, success } from './utils';

export class PlanetTestModule {
    // TODO i dont like clock being public
    public readonly clock: TimeTravelClock;
    private readonly planetRepo: MemoryPlanetRepository;
    private command$: CommandBus;
    private event$: EventBus;

    constructor() {
        this.clock = new TimeTravelClock();
        this.planetRepo = new MemoryPlanetRepository(this.clock);
    }

    public async init() {
        const module = await Test.createTestingModule({
            imports: [CqrsModule],
            providers: [Clock, PlanetRepository, ...CommandHandlers],
        })
            .overrideProvider(PlanetRepository)
            .useValue(this.planetRepo)
            .overrideProvider(Clock)
            .useValue(this.clock)
            .compile();

        this.command$ = module.get<CommandBus>(CommandBus);
        this.event$ = module.get<EventBus>(EventBus);

        // EventStore
        this.event$.subscribe(event => {
            this.planetRepo.events.push(event);
        });

        // TODO check why ExplorerSerice is not working
        // console.log('HANDLERS', (this.command$ as any).handlers);
        this.command$.register(CommandHandlers);
        // console.log('HANDLERS', (this.command$ as any).handlers);
    }

    public execute<T extends ICommand>(command: T) {
        return niceError(this.command$.execute(command));
    }

    public publish<T extends IEvent>(event: T) {
        this.planetRepo.events.push(event);
    }

    public async createPlanet(
        planetId: UUID,
        temperature: number = 0,
        point: PointT = {
            x: 1 as any,
            y: 1 as any,
            z: 1 as any,
            t: 1 as any,
        },
    ) {
        const joinCommand = new PlayerJoinCommand({
            ms: this.clock.now(),
            playerId: generateUUID(),
            planetId,
            point,
            temperature: int(temperature),
        });
        const request = this.execute(joinCommand);
        await success(request);
    }

    public async getPlanet(id: UUID) {
        const planet = await this.getPlanetById(id);
        if (!planet) {
            return fail('planet not found');
        }
        expect(planet.id).toBe(id);
        return planet;
    }

    public async mockBuildings(
        planetId: UUID,
        buildings: Record<string, number>,
    ) {
        const events = Object.entries(buildings).map(
            ([buildingId, level]) =>
                new BuildFinishedEvent({
                    ms: this.clock.now(),
                    planetId,
                    buildingId,
                    level: int(level),
                }),
        );
        events.forEach(event => this.publish(event));
    }

    public async mockTechnologies(
        planetId: UUID,
        technologies: Record<string, number>,
    ) {
        const events = Object.entries(technologies).map(
            ([techId, level]) =>
                new ResearchFinishedEvent({
                    ms: this.clock.now(),
                    planetId,
                    techId,
                    level: int(level),
                }),
        );
        events.forEach(event => this.publish(event));
    }

    public async mockShipyard(planetId: UUID, ships: Record<string, number>) {
        const events = Object.entries(ships).map(
            ([unitId, quantity]) =>
                new ShipyardFinishedEvent({
                    ms: this.clock.now(),
                    planetId,
                    unitId,
                    quantity: int(quantity),
                }),
        );
        events.forEach(event => this.publish(event));
    }

    public async mockResources(planetId: UUID) {
        const { levels } = await this.getPlanet(planetId);
        await this.mockBuildings(planetId, {
            MetalMine: 50,
            CrystalMine: 50,
            DeuteriumSynthesizer: 50,
            SolarPlant: 70,
            MetalStorage: 10,
            CrystalStorage: 10,
            DeuteriumTank: 10,
        });
        this.clock.fastForwardOneMonth();
        // restore original levels
        await this.mockBuildings(planetId, {
            MetalMine: levels.MetalMine || 0,
            CrystalMine: levels.CrystalMine || 0,
            DeuteriumSynthesizer: levels.DeuteriumSynthesizer || 0,
            SolarPlant: levels.SolarPlant || 0,
            MetalStorage: levels.MetalStorage || 0,
            CrystalStorage: levels.CrystalStorage || 0,
            DeuteriumTank: levels.DeuteriumTank || 0,
        });
    }

    public getPlanetById(id: UUID) {
        return niceError(this.planetRepo.getById(id));
    }

    public getPlanetByPoint(point: PointT) {
        return niceError(this.planetRepo.getByPoint(point));
    }

    public async expectImprovesSpeed(options: {
        planetId: UUID;
        buildingId: string;
        speed: (level: number) => number;
        duration: () => Promise<number>;
    }) {
        const MAX_LEVEL = 20;
        let lastDuration: number = Number.POSITIVE_INFINITY;
        let mass: number = 0;

        for (let level = 1; level <= MAX_LEVEL; level += 1) {
            await this.mockBuildings(options.planetId, {
                [options.buildingId]: level,
            });
            const duration = await options.duration();
            expect(duration).toBeLessThan(lastDuration);
            const speed = options.speed(level);
            if (level > 1) {
                expect(duration * speed).toBeApprox(mass);
            } else {
                mass = duration * speed;
            }
            lastDuration = duration;
        }
    }
}
