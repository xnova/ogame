import { CommandBus, CqrsModule, EventBus, ICommand } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UUID } from 'io-ts-types/lib/UUID';

import {
    BuildCancelCommand,
    BuildStartCommand,
    PlayerJoinCommand,
} from '../src/planet/commands';
import {
    BuildingNotFoundException,
    BuildingTooMuchException,
    InvalidLevelException,
    PlanetAlreadyBuildingException,
    PlanetNotBuildingException,
    PlanetNotEnoughResourcesException,
} from '../src/planet/exceptions';
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

    const fetchPlanet = (id: UUID) =>
        niceError(planetRepo.getById(id)).then(p => {
            if (!p) {
                return fail('planet not found');
            }
            expect(p.id).toBe(id);
            return p;
        });

    const submit = <T extends ICommand>(command: T) =>
        niceError(command$.execute(command));

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

        const request = submit(joinCommand);
        expect(await request).toBe(undefined);
    });

    describe('Build', () => {
        it('cannot cancel if not building anything', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const cancelCommand = new BuildCancelCommand({
                ms: Date.now(),
                planetId,
            });
            const request = submit(cancelCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotBuildingException,
            );
        });

        it('cannot build non existing building', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'Foo',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                BuildingNotFoundException,
            );
        });

        it('cannot build negative levels', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'MetalMine',
                level: -1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(InvalidLevelException);
        });

        it('can start building MetalMine', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'MetalMine',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            expect(await request).toBe(undefined);

            const planet = await fetchPlanet(planetId);
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
                buildingId: 'CrystalMine',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                PlanetAlreadyBuildingException,
            );
        });

        it.todo('cannot cancel different than current construction');

        it('can cancel', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);

            const cancelCommand = new BuildCancelCommand({
                ms: Date.now(),
                planetId,
            });
            const request = submit(cancelCommand);
            expect(await request).toBe(undefined);

            const planet = await fetchPlanet(planetId);
            expect(planet.construction).toBeNull();

            const cost = Resources.Partial({ metal: 60, crystal: 15 });
            const restored = planet.resources.subtract(beforePlanet.resources);
            expect(resourceDist(restored)(cost)).toBeLessThan(EPSILON);
        });

        it('build level must be +1 than current level', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'MetalMine',
                level: 2 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                BuildingTooMuchException,
            );
        });

        it.todo('can start building crystalMine');

        it('cannot build if not enough resources', async () => {
            const { planetId } = joinCommand.payload;

            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: Date.now(),
                planetId,
                buildingId: 'ResearchLab',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotEnoughResourcesException,
            );
        });

        it.todo('cannot build if not satisfying requirements');

        it.todo('can finish building');

        it.todo('finished building occupies 1 field');

        it.todo('cannot build if not enough available fields');

        it.todo('can dismantle a building');
    });
});
