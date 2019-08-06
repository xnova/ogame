import { CommandBus, CqrsModule, EventBus, ICommand } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UUID } from 'io-ts-types/lib/UUID';

import { Clock } from '../src/planet/clock';
import {
    BuildCancelCommand,
    BuildFinishCommand,
    BuildStartCommand,
    PlayerJoinCommand,
} from '../src/planet/commands';
import { BuildFinishedEvent } from '../src/planet/events';
import {
    BuildingNotFoundException,
    BuildingTooMuchException,
    InvalidLevelException,
    PlanetAlreadyBuildingException,
    PlanetNotBuildingException,
    PlanetNotEnoughFieldsException,
    PlanetNotEnoughResourcesException,
    PlanetNotFinishedBuildingException,
    RequirementsAreNotMeetException,
} from '../src/planet/exceptions';
import { CommandHandlers } from '../src/planet/handlers';
import { MetalMine } from '../src/planet/models/buildings';
import { PlanetModel } from '../src/planet/models/planet.model';
import { PlanetRepository } from '../src/planet/planet.repository';
import { PointT } from '../src/shared/Point';
import { Resources } from '../src/shared/resources';

import { MemoryPlanetRepository } from './memory-planet.repository';
import { TimeTravelClock } from './TimeTravelClock';
import { generateUUID, niceError, resourceDist, sum } from './utils';

const EPSILON = 0.001;

describe('PlanetModule', () => {
    let command$: CommandBus;
    let event$: EventBus;
    const clock = new TimeTravelClock();
    const planetRepo = new MemoryPlanetRepository(clock);

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

    const createPlanet = (planetId: UUID, point: PointT) => async () => {
        const joinCommand = new PlayerJoinCommand({
            ms: clock.now(),
            playerId: generateUUID(),
            planetId,
            point,
            temperature: 69 as any,
        });
        const request = submit(joinCommand);
        expect(await request).toBe(undefined);
    };

    const TestBuilding = (options: {
        planetId: UUID;
        buildingId: string;
        level: number;
        duration: number;
        cost: Resources;
    }): {
        canStart: () => Promise<any>;
        canCancel: () => Promise<any>;
        canFinish: () => Promise<any>;
    } => {
        const { planetId } = options;
        const testConstruction = (planet: PlanetModel) => {
            if (!planet.construction) {
                return fail('planet construction not found');
            }
            expect(planet.construction.buildingId).toBe(options.buildingId);
            expect(planet.construction.level).toBe(options.level);
            const duration =
                planet.construction.end - planet.construction.start;
            expect(duration).toBe(options.duration);
        };
        const canStart = async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: options.buildingId,
                level: options.level as any,
            });
            const request = submit(buildCommand);
            expect(await request).toBe(undefined);

            const planet = await fetchPlanet(planetId);
            testConstruction(planet);

            const paid = beforePlanet.resources.subtract(planet.resources);
            expect(resourceDist(paid)(options.cost)).toBeLessThan(EPSILON);
        };
        const canCancel = async () => {
            const beforePlanet = await fetchPlanet(planetId);
            testConstruction(beforePlanet);

            const cancelCommand = new BuildCancelCommand({
                ms: clock.now(),
                planetId,
            });
            const request = submit(cancelCommand);
            expect(await request).toBe(undefined);

            const planet = await fetchPlanet(planetId);
            expect(planet.construction).toBeNull();

            const restored = planet.resources.subtract(beforePlanet.resources);
            expect(resourceDist(restored)(options.cost)).toBeLessThan(EPSILON);
        };
        const canFinish = async () => {
            clock.fastForward(options.duration);
            const finishCommand = new BuildFinishCommand({
                ms: clock.now(),
                planetId,
            });
            const request = submit(finishCommand);
            expect(await request).toBe(undefined);

            const planet = await fetchPlanet(planetId);
            expect(planet.construction).toBeNull();
            expect(planet.get(MetalMine).level).toBe(options.level);
        };
        return { canStart, canCancel, canFinish };
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CqrsModule],
            providers: [Clock, PlanetRepository, ...CommandHandlers],
        })
            .overrideProvider(PlanetRepository)
            .useValue(planetRepo)
            .overrideProvider(Clock)
            .useValue(clock)
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

    describe('Build', () => {
        const planetId = generateUUID();
        const point: PointT = {
            x: 1 as any,
            y: 1 as any,
            z: 8 as any,
            t: 1 as any,
        };

        beforeAll(createPlanet(planetId, point));

        it('new planet has no occupied fields', async () => {
            const planet = await fetchPlanet(planetId);
            expect(planet.occupiedFields).toBe(0);
        });

        it('cannot cancel if not building anything', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const cancelCommand = new BuildCancelCommand({
                ms: clock.now(),
                planetId,
            });
            const request = submit(cancelCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotBuildingException,
            );
        });

        it('cannot build non existing building', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
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
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'MetalMine',
                level: -1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(InvalidLevelException);
        });

        const metalMine = TestBuilding({
            planetId,
            buildingId: 'MetalMine',
            level: 1,
            duration: 108 * 1000,
            cost: Resources.Partial({ metal: 60, crystal: 15 }),
        });

        it('can start building MetalMine', metalMine.canStart);

        it('cannot start building if already building', async () => {
            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'CrystalMine',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                PlanetAlreadyBuildingException,
            );
        });

        // In case CancelCommand carries id of construction
        // it.todo('cannot cancel different than current construction');

        it('can cancel', metalMine.canCancel);

        it('build level must be +1 than current level', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'MetalMine',
                level: 2 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                BuildingTooMuchException,
            );
        });

        it('cannot build if not enough resources', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'ResearchLab',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotEnoughResourcesException,
            );
        });

        const crystalMine = TestBuilding({
            planetId,
            buildingId: 'CrystalMine',
            level: 1,
            duration: 103680,
            cost: Resources.Partial({ metal: 48, crystal: 24 }),
        });

        it('can start building CrystalMine', crystalMine.canStart);

        it('can cancel CrystalMine', crystalMine.canCancel);

        it('cannot finish if not building anything', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const finishCommand = new BuildFinishCommand({
                ms: clock.now(),
                planetId,
            });
            const request = submit(finishCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotBuildingException,
            );
        });

        it('cannot finish building before construction ends', async () => {
            await metalMine.canStart();

            const finishCommand = new BuildFinishCommand({
                ms: clock.now(),
                planetId,
            });
            const request = submit(finishCommand);
            await expect(request).rejects.toThrowError(
                PlanetNotFinishedBuildingException,
            );
        });

        it('can finish building when construction ends', metalMine.canFinish);

        it('finished building occupies 1 field', async () => {
            const planet = await fetchPlanet(planetId);
            expect(planet.occupiedFields).toBe(1);
        });

        it('can improve MetalMine to level 2', async () => {
            const improvement = TestBuilding({
                planetId,
                buildingId: 'MetalMine',
                level: 2,
                duration: 161280,
                cost: Resources.Partial({ metal: 90, crystal: 22 }),
            });
            await improvement.canStart();
            await improvement.canCancel();
        });

        it('can improve CrystalMine to level 2', async () => {
            const improvement = TestBuilding({
                planetId,
                buildingId: 'CrystalMine',
                level: 2,
                duration: 164160,
                cost: Resources.Partial({ metal: 76, crystal: 38 }),
            });
            await crystalMine.canStart();
            await crystalMine.canFinish();
            await improvement.canStart();
            await improvement.canCancel();
        });

        it('cannot build if not enough available fields', async () => {
            // mock a lot of buildings
            clock.fastForward(30 * 24 * 3600 * 1000);
            const metalEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'MetalMine',
                level: 50 as any,
            });
            const crystalEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'CrystalMine',
                level: 50 as any,
            });
            const deuteriumEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'DeuteriumSynthesizer',
                level: 50 as any,
            });
            const solarEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'SolarPlant',
                level: 13 as any,
            });
            const buildingEvents = [
                metalEvent,
                crystalEvent,
                deuteriumEvent,
                solarEvent,
            ];
            buildingEvents.forEach(event => planetRepo.events.push(event));

            const planet = await fetchPlanet(planetId);
            const occupiedFields: number = sum(
                buildingEvents.map(event => event.payload.level),
            );
            expect(planet.occupiedFields).toBe(occupiedFields);
            expect(planet.occupiedFields).toBe(planet.fields);
            expect(planet.construction).toBeNull();

            // expect error when doing ampliation
            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'MetalStorage',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            // TODO expect exact error
            await expect(request).rejects.toThrowError(
                PlanetNotEnoughFieldsException,
            );
        });

        it.todo('can dismantle a building');

        // TODO another module
        it.todo('new planet fields is a function of diameter');
        it.todo('home planet has 163 fields');
        it.todo('new planet has basic income');
    });

    describe('Requirements', () => {
        const planetId = generateUUID();
        const point: PointT = {
            x: 2 as any,
            y: 1 as any,
            z: 8 as any,
            t: 1 as any,
        };

        beforeAll(createPlanet(planetId, point));

        it('cannot build if not satisfying requirements', async () => {
            const beforePlanet = await fetchPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const buildCommand = new BuildStartCommand({
                ms: clock.now(),
                planetId,
                buildingId: 'Shipyard',
                level: 1 as any,
            });
            const request = submit(buildCommand);
            await expect(request).rejects.toThrowError(
                RequirementsAreNotMeetException,
            );
        });

        const shipyard = TestBuilding({
            planetId,
            buildingId: 'Shipyard',
            level: 1,
            duration: 864 * 1000,
            cost: Resources.Partial({
                metal: 400,
                crystal: 200,
                deuterium: 100,
            }),
        });

        it('can build a Shipyard when requirements are meet', async () => {
            // mock shipyard requirements
            const robotsEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'RoboticsFactory',
                level: 2 as any,
            });
            planetRepo.events.push(robotsEvent);
            // give 100 deuterium
            const synthEvent = new BuildFinishedEvent({
                ms: clock.now(),
                planetId,
                buildingId: 'DeuteriumSynthesizer',
                level: 1 as any,
            });
            planetRepo.events.push(synthEvent);
            // TODO add solar plant to have enough energy
            clock.fastForward(7 * 24 * 3600 * 1000);

            await shipyard.canStart();
        });
    });
});
