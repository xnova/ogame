import { UUID } from 'io-ts-types/lib/UUID';

import {
    ResearchCancelCommand,
    ResearchFinishCommand,
    ResearchStartCommand,
} from '../src/planet/commands';
import {
    InvalidLevelException,
    PlanetAlreadyBusyException,
    PlanetNotBusyException,
    PlanetNotEnoughResourcesException,
    PlanetNotFinishedException,
    RequirementsAreNotMeetException,
    TechnologyNotFoundException,
    TooMuchLevelException,
} from '../src/planet/exceptions';
import { Resources } from '../src/shared/resources';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { ArgsType, failure, generateUUID, int, success } from './utils';

const TECHNOLOGIES = [
    'EnergyTechnology',
    'LaserTechnology',
    'IonTechnology',
    'HyperspaceTechnology',
    'PlasmaTechnology',
    'CombustionDrive',
    'ImpulseDrive',
    'HyperspaceDrive',
    'EspionageTechnology',
    'ComputerTechnology',
    'Astrophysics',
    'IntergalacticResearchNetwork',
    'WeaponsTechnology',
    'ShieldingTechnology',
    'ArmourTechnology',
    'GravitonTechnology',
];

describe('PlanetModule', () => {
    let module: PlanetTestModule;

    const researchStart = (options: {
        planetId: UUID;
        techId: string;
        level: number;
    }) =>
        module.execute(
            new ResearchStartCommand({
                ms: module.clock.now(),
                ...options,
                level: int(options.level),
            }),
        );

    const cancel = (planetId: UUID) =>
        module.execute(
            new ResearchCancelCommand({ ms: module.clock.now(), planetId }),
        );

    const finish = (planetId: UUID) =>
        module.execute(
            new ResearchFinishCommand({ ms: module.clock.now(), planetId }),
        );

    type Payload = ArgsType<typeof researchStart>[0] & {
        cost: Resources;
    };

    const canStart = async ({ planetId, techId, level, cost }: Payload) => {
        await module.mockResources(planetId);
        const beforePlanet = await module.getPlanet(planetId);
        expect(beforePlanet.research).toBeNull();

        const request = researchStart({ planetId, techId, level });
        await success(request);

        const { research, resources } = await module.getPlanet(planetId);
        if (!research) {
            return fail('planet research not found');
        }
        expect(research.id).toBe(techId);
        expect(research.level).toBe(level);

        const paid = beforePlanet.resources.subtract(resources);
        expect(paid).toBeResources(cost);

        const duration = research.end - research.start;
        // duration is positive
        expect(duration).toBeGreaterThan(0);
        return { ...research, duration };
    };

    const canCancel = async (options: Payload) => {
        await canStart(options);

        const beforePlanet = await module.getPlanet(options.planetId);
        const request = cancel(options.planetId);
        await success(request);

        const planet = await module.getPlanet(options.planetId);
        expect(planet.research).toBeNull();
        const restored = planet.resources.subtract(beforePlanet.resources);
        expect(restored).toBeResources(options.cost);
    };

    const canFinish = async (options: Payload) => {
        const { duration } = await canStart(options);
        module.clock.fastForward(duration);
        const request = finish(options.planetId);
        await success(request);

        const planet = await module.getPlanet(options.planetId);
        expect(planet.research).toBeNull();
        expect(planet.levels[options.techId]).toBe(options.level);
    };

    const TestResearch = (options: Payload) => ({
        canStart: () => canStart(options),
        canCancel: () => canCancel(options),
        canFinish: () => canFinish(options),
    });

    beforeEach(async () => {
        module = new PlanetTestModule();
        await module.init();
    });

    describe('Research', () => {
        const planetId = generateUUID();

        beforeEach(async () => {
            await module.createPlanet(planetId);
            await module.mockBuildings(planetId, { ResearchLab: 2 });
        });

        it('cannot research non existing technology', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = researchStart({
                planetId,
                techId: 'Foo',
                level: 1,
            });
            await failure(request, TechnologyNotFoundException);
        });

        it('cannot research negative levels', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = researchStart({
                planetId,
                techId: 'EnergyTechnology',
                level: -1,
            });
            await failure(request, InvalidLevelException);
        });

        describe('cannot research withoud a Lab', () => {
            beforeEach(async () => {
                await module.mockBuildings(planetId, { ResearchLab: 0 });
            });

            const noLab = (techId: string) => {
                it(`cannot research ${techId} withoud a Lab`, async () => {
                    const beforePlanet = await module.getPlanet(planetId);
                    expect(beforePlanet.research).toBeNull();

                    const request = researchStart({
                        planetId,
                        techId,
                        level: 1,
                    });
                    await failure(request, RequirementsAreNotMeetException);
                });
            };

            for (const techId of TECHNOLOGIES) {
                noLab(techId);
            }

            // TODO cannot research other technologies without lab
            // even if not in requirements and other requirements are meet
            // TODO mock technologies
        });

        it('cannot research if not enough resources', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = researchStart({
                planetId,
                techId: 'EnergyTechnology',
                level: 1,
            });
            await failure(request, PlanetNotEnoughResourcesException);
        });

        const energy1 = TestResearch({
            planetId,
            techId: 'EnergyTechnology',
            level: 1,
            cost: Resources.Partial({ crystal: 800, deuterium: 400 }),
        });

        const armour1 = TestResearch({
            planetId,
            techId: 'ArmourTechnology',
            level: 1,
            cost: Resources.Partial({ metal: 1000 }),
        });

        const armour2 = TestResearch({
            planetId,
            techId: 'ArmourTechnology',
            level: 2,
            cost: Resources.Partial({ metal: 2000 }),
        });

        it('can start researching EnergyTechnology', () => energy1.canStart());

        it('can start researching ArmourTechnology', () => armour1.canStart());

        it('cannot research if already researching', async () => {
            await energy1.canStart();
            const request = researchStart({
                planetId,
                techId: 'ArmourTechnology',
                level: 1,
            });
            await failure(request, PlanetAlreadyBusyException);
        });

        it.todo('cannot research if another Colony is researching');

        describe('Cancel', () => {
            it('cannot cancel if not researching anything', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.research).toBeNull();

                const request = cancel(planetId);
                await failure(request, PlanetNotBusyException);
            });

            it('can cancel EnergyTechnology', () => energy1.canCancel());
            it('can cancel ArmourTechnology', () => armour1.canCancel());
        });

        describe('Finish', () => {
            it('cannot finish if not researching', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.research).toBeNull();

                const request = finish(planetId);
                await failure(request, PlanetNotBusyException);
            });

            it('cannot finish research before it ends', async () => {
                await energy1.canStart();
                module.clock.fastForward(1);

                const request = finish(planetId);
                await failure(request, PlanetNotFinishedException);
            });

            it('can finish EnergyTechnology@1', () => energy1.canFinish());
            it('can finish ArmourTechnology@1', () => armour1.canFinish());
            // can finish other levels
            it('can finish ArmourTechnology@2', async () => {
                await armour1.canFinish();
                await armour2.canFinish();
            });
        });

        // TODO same cost resources

        it('research level must be +1 than current level', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = researchStart({
                planetId,
                techId: 'EnergyTechnology',
                level: 2,
            });
            await failure(request, TooMuchLevelException);
        });

        describe('Duration', () => {
            it('EnergyTechnology has same duration', async () => {
                await module.mockBuildings(planetId, { ResearchLab: 1 });
                const { duration } = await energy1.canStart();
                // tslint:disable-next-line: no-magic-numbers
                expect(duration).toBe(1440000);
            });

            it('ArmourTechnology has same duration', async () => {
                await module.mockBuildings(planetId, { ResearchLab: 2 });
                const { duration } = await armour1.canStart();
                // tslint:disable-next-line: no-magic-numbers
                expect(duration).toBe(1200000);
            });

            it('ResearchLab improves research speed', () =>
                module.expectImprovesSpeed({
                    planetId,
                    buildingId: 'ResearchLab',
                    speed: level => 1 + level,
                    duration: async () => {
                        const { duration } = await energy1.canStart();
                        await success(cancel(planetId));
                        return duration;
                    },
                }));

            it.todo('Intergalactic Research Network');
        });
    });
});
