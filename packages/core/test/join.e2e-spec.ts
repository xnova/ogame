import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';
import * as uuid from 'uuid';

import { PlayerJoinCommand } from '../src/planet/commands';
import { CommandHandlers } from '../src/planet/handlers';
import { PlanetRepository } from '../src/planet/planet.repository';
import { PointT } from '../src/shared/Point';

import { MemoryPlanetRepository } from './memory-planet.repository';
import { niceError } from './utils';

const generateUUID = uuid.v4 as () => UUID;

describe('PlanetModule', () => {
    let command$: CommandBus;
    let event$: EventBus;
    const planetRepo = new MemoryPlanetRepository();

    const joinCommand = new PlayerJoinCommand({
        ms: Date.now(),
        playerId: generateUUID(),
        planetId: generateUUID(),
        point: {
            x: 1 as any,
            y: 1 as any,
            z: 8 as any,
            t: 1 as any,
        },
        temperature: 69 as any,
    });

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CqrsModule],
            providers: [PlanetRepository, ...CommandHandlers],
        })
            .overrideProvider(PlanetRepository)
            .useValue(planetRepo)
            .compile();

        command$ = module.get<CommandBus>(CommandBus);
        event$ = module.get<EventBus>(EventBus);

        // EventStore
        event$.subscribe(event => {
            planetRepo.events.push(event);
        });

        // TODO check why ExplorerSerice is not working
        console.log('HANDLERS', (command$ as any).handlers);
        command$.register(CommandHandlers);
        console.log('HANDLERS', (command$ as any).handlers);
    });

    describe('PlayerJoin', () => {
        it('can send command', async () => {
            const { planetId, point, temperature } = joinCommand.payload;

            const byId = niceError(planetRepo.getById(planetId));
            const byPoint = niceError(planetRepo.getByPoint(point));
            expect(await byId).toBe(undefined);
            expect(await byPoint).toBe(undefined);

            const request = niceError(command$.execute(joinCommand));
            expect(await request).toBe(undefined);

            const planet = await niceError(planetRepo.getById(planetId));
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
            expect(planet.temperature).toBe(temperature);
        });

        it('find planet by position', async () => {
            const { point, planetId } = joinCommand.payload;
            // we want to be sure is not being matched by reference
            const planet = await niceError(planetRepo.getByPoint({ ...point }));
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
        });

        it('only creates one planet', async () => {
            const { point } = joinCommand.payload;

            const withOtherId = niceError(planetRepo.getById(generateUUID()));
            expect(await withOtherId).toBe(undefined);

            const diffPoint: PointT = { ...point, x: (point.x + 1) as any };
            const withOtherGalaxy = niceError(planetRepo.getByPoint(diffPoint));
            expect(await withOtherGalaxy).toBe(undefined);
        });

        it('player cannot join again', async () => {
            const { point } = joinCommand.payload;
            const diffPoint: PointT = { ...point, x: (point.x + 1) as any };

            const command = new PlayerJoinCommand({
                ...joinCommand.payload,
                planetId: generateUUID(),
                point: diffPoint,
            });
            const request = niceError(command$.execute(command));
            await expect(request).rejects.toThrow();
        });

        it('cannot create a planet on the same place', async () => {
            const command = new PlayerJoinCommand({
                ...joinCommand.payload,
                playerId: generateUUID(),
                planetId: generateUUID(),
            });
            const request = niceError(command$.execute(command));
            await expect(request).rejects.toThrow();
        });

        it('cannot create a planet with the same id', async () => {
            const { point } = joinCommand.payload;
            const diffPoint: PointT = { ...point, x: (point.x + 1) as any };

            const command = new PlayerJoinCommand({
                ...joinCommand.payload,
                playerId: generateUUID(),
                point: diffPoint,
            });
            const request = niceError(command$.execute(command));
            await expect(request).rejects.toThrow();
        });
    });
});
