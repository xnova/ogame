import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { BuildStartCommand, PlayerJoinCommand } from '../src/planet/commands';
import { CommandHandlers } from '../src/planet/handlers';
import { PlanetRepository } from '../src/planet/planet.repository';
import { Resources } from '../src/shared/resources';

import { MemoryPlanetRepository } from './memory-planet.repository';
import { generateUUID, niceError, resourceDist } from './utils';

const EPSILON = 0.001;

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

        const request = niceError(command$.execute(joinCommand));
        expect(await request).toBe(undefined);
    });

    describe('Build', () => {
        it.todo('cannot cancel if not building anything');

        it('can start building metalMine', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await niceError(planetRepo.getById(planetId));
            if (!beforePlanet) {
                return fail('planet not found');
            }
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'metalMine',
                level: 1 as any,
            });
            const request = niceError(command$.execute(buildCommand));
            expect(await request).toBe(undefined);

            const planet = await niceError(planetRepo.getById(planetId));
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
            if (!planet.construction) {
                return fail('planet construction not found');
            }

            expect(planet.construction.buildingId).toBe('metalMine');
            expect(planet.construction.level).toBe(1);

            const duration =
                planet.construction.end - planet.construction.start;
            expect(duration).toBe(108 * 1000);

            const cost = Resources.Partial({ metal: 60, crystal: 15 });
            const paid = beforePlanet.resources.subtract(planet.resources);
            expect(resourceDist(paid)(cost)).toBeLessThan(EPSILON);
        });

        it('cannot start building if already building', async () => {
            const { planetId } = joinCommand.payload;

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'crystalMine',
                level: 1 as any,
            });
            const request = niceError(command$.execute(buildCommand));
            await expect(request).rejects.toThrow();
        });

        it.todo('can cancel');

        it.todo('cannot build negative levels');

        it.todo('build level must be +1 than current level');

        it.todo('can start building crystalMine');
    });
});
