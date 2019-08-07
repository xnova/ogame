import {
    CommandBus,
    CqrsModule,
    EventBus,
    ICommand,
    IEvent,
} from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Clock } from '../src/planet/clock';
import { PlayerJoinCommand } from '../src/planet/commands';
import { BuildFinishedEvent } from '../src/planet/events';
import { CommandHandlers } from '../src/planet/handlers';
import { PlanetRepository } from '../src/planet/planet.repository';
import { PointT } from '../src/shared/Point';
import { valueOrThrow } from '../src/shared/types';

import { MemoryPlanetRepository } from './memory-planet.repository';
import { TimeTravelClock } from './TimeTravelClock';
import { generateUUID, niceError } from './utils';

const int = valueOrThrow(t.Int);

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
        console.log('HANDLERS', (this.command$ as any).handlers);
        this.command$.register(CommandHandlers);
        console.log('HANDLERS', (this.command$ as any).handlers);
    }

    public execute<T extends ICommand>(command: T) {
        return niceError(this.command$.execute(command));
    }

    public publish<T extends IEvent>(event: T) {
        this.planetRepo.events.push(event);
    }

    public async createPlanet(
        planetId: UUID,
        point: PointT = {
            x: 1 as any,
            y: 1 as any,
            z: 8 as any,
            t: 1 as any,
        },
    ) {
        const joinCommand = new PlayerJoinCommand({
            ms: this.clock.now(),
            playerId: generateUUID(),
            planetId,
            point,
            temperature: 69 as any,
        });
        const request = this.execute(joinCommand);
        expect(await request).toBe(undefined);
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

    public getPlanetById(id: UUID) {
        return niceError(this.planetRepo.getById(id));
    }

    public getPlanetByPoint(point: PointT) {
        return niceError(this.planetRepo.getByPoint(point));
    }
}
