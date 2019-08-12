import { UUID } from 'io-ts-types/lib/UUID';

import {
    BuildCancelCommand,
    BuildFinishCommand,
    BuildStartCommand,
} from '../src/planet/commands';
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
import { MetalMine } from '../src/planet/models/buildings';
import { PlanetModel } from '../src/planet/models/planet.model';
import { Resources } from '../src/shared/resources';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { failure, generateUUID, int, success } from './utils';

describe('PlanetModule', () => {
    let module: PlanetTestModule;

    const build = ({
        planetId,
        buildingId,
        level,
    }: {
        planetId: UUID;
        buildingId: string;
        level: number;
    }) =>
        module.execute(
            new BuildStartCommand({
                ms: module.clock.now(),
                planetId,
                buildingId,
                level: int(level),
            }),
        );

    const cancel = (planetId: UUID) =>
        module.execute(
            new BuildCancelCommand({ ms: module.clock.now(), planetId }),
        );

    const finish = (planetId: UUID) =>
        module.execute(
            new BuildFinishCommand({ ms: module.clock.now(), planetId }),
        );

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
        const testConstruction = ({ construction }: PlanetModel) => {
            if (!construction) {
                return fail('planet construction not found');
            }
            expect(construction.buildingId).toBe(options.buildingId);
            expect(construction.level).toBe(options.level);
            const duration = construction.end - construction.start;
            expect(duration).toBe(options.duration);
        };
        const canStart = async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({
                planetId,
                buildingId: options.buildingId,
                level: options.level,
            });
            await success(request);

            const planet = await module.getPlanet(planetId);
            testConstruction(planet);

            const paid = beforePlanet.resources.subtract(planet.resources);
            expect(paid).toBeResources(options.cost);
        };
        const canCancel = async () => {
            const beforePlanet = await module.getPlanet(planetId);
            testConstruction(beforePlanet);

            const request = cancel(planetId);
            await success(request);

            const planet = await module.getPlanet(planetId);
            expect(planet.construction).toBeNull();

            const restored = planet.resources.subtract(beforePlanet.resources);
            expect(restored).toBeResources(options.cost);
        };
        const canFinish = async () => {
            module.clock.fastForward(options.duration);
            const request = finish(planetId);
            await success(request);

            const planet = await module.getPlanet(planetId);
            expect(planet.construction).toBeNull();
            // TODO can finish others buildings
            expect(planet.get(MetalMine).level).toBe(options.level);
        };
        return { canStart, canCancel, canFinish };
    };

    describe('Build', () => {
        const planetId = generateUUID();

        beforeAll(async () => {
            module = new PlanetTestModule();
            await module.init();
            await module.createPlanet(planetId);
        });

        it('new planet has no occupied fields', async () => {
            const planet = await module.getPlanet(planetId);
            expect(planet.occupiedFields).toBe(0);
        });

        it('cannot cancel if not building anything', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = cancel(planetId);
            await failure(request, PlanetNotBuildingException);
        });

        it('cannot build non existing building', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({ planetId, buildingId: 'Foo', level: 1 });
            await failure(request, BuildingNotFoundException);
        });

        it('cannot build negative levels', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({
                planetId,
                buildingId: 'MetalMine',
                level: -1,
            });
            await failure(request, InvalidLevelException);
        });

        const metalMine = TestBuilding({
            planetId,
            buildingId: 'MetalMine',
            level: 1,
            duration: 108000,
            cost: Resources.Partial({ metal: 60, crystal: 15 }),
        });

        it('can start building MetalMine', metalMine.canStart);

        it('cannot start building if already building', async () => {
            const request = build({
                planetId,
                buildingId: 'CrystalMine',
                level: 1,
            });
            await failure(request, PlanetAlreadyBuildingException);
        });

        // In case CancelCommand carries id of construction
        // it.todo('cannot cancel different than current construction');
        // it.todo('cannot finish different than current construction');

        it('can cancel', metalMine.canCancel);

        it('build level must be +1 than current level', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({
                planetId,
                buildingId: 'MetalMine',
                level: 2,
            });
            await failure(request, BuildingTooMuchException);
        });

        it('cannot build if not enough resources', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({
                planetId,
                buildingId: 'ResearchLab',
                level: 1,
            });
            await failure(request, PlanetNotEnoughResourcesException);
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
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = finish(planetId);
            await failure(request, PlanetNotBuildingException);
        });

        it('cannot finish building before construction ends', async () => {
            await metalMine.canStart();

            const request = finish(planetId);
            await failure(request, PlanetNotFinishedBuildingException);
        });

        it('can finish building when construction ends', metalMine.canFinish);

        it('finished building occupies 1 field', async () => {
            const planet = await module.getPlanet(planetId);
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
            module.clock.fastForwardOneMonth();
            await module.mockBuildings(planetId, {
                MetalMine: 50,
                CrystalMine: 50,
                DeuteriumSynthesizer: 50,
                SolarPlant: 13,
            });

            const planet = await module.getPlanet(planetId);
            const occupiedFields: number = 163;
            expect(planet.occupiedFields).toBe(occupiedFields);
            expect(planet.occupiedFields).toBe(planet.fields);
            expect(planet.construction).toBeNull();

            // expect error when doing ampliation
            const request = build({
                planetId,
                buildingId: 'MetalStorage',
                level: 1,
            });
            await failure(request, PlanetNotEnoughFieldsException);
        });

        it.todo('can dismantle a building');

        // TODO another module
        it.todo('new planet fields is a function of diameter');
        it.todo('home planet has 163 fields');
    });

    describe('Requirements', () => {
        const planetId = generateUUID();

        beforeAll(async () => {
            module = new PlanetTestModule();
            await module.init();
            await module.createPlanet(planetId);
        });

        it('cannot build if not satisfying requirements', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.construction).toBeNull();

            const request = build({
                planetId,
                buildingId: 'Shipyard',
                level: 1,
            });
            await failure(request, RequirementsAreNotMeetException);
        });

        const shipyard = TestBuilding({
            planetId,
            buildingId: 'Shipyard',
            level: 1,
            duration: 864000,
            cost: Resources.Partial({
                metal: 400,
                crystal: 200,
                deuterium: 100,
            }),
        });

        it('can build a Shipyard when requirements are meet', async () => {
            await module.mockBuildings(planetId, {
                // mock shipyard requirements
                RoboticsFactory: 2,
                // give 100 deuterium
                DeuteriumSynthesizer: 1,
                // add solar plant to have enough energy for producing deuterium
                SolarPlant: 5,
            });
            module.clock.fastForwardOneWeek();
            await shipyard.canStart();
        });
    });
});
