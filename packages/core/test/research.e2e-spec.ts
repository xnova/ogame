import { UUID } from 'io-ts-types/lib/UUID';

import {
    ResearchCancelCommand,
    ResearchStartCommand,
} from '../src/planet/commands';
import {
    InvalidLevelException,
    PlanetAlreadyResearchingException,
    PlanetNotEnoughResourcesException,
    PlanetNotResearchingException,
    RequirementsAreNotMeetException,
    TechnologyNotFoundException,
    TooMuchLevelException,
} from '../src/planet/exceptions';
import { Resources } from '../src/shared/resources';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { failure, generateUUID, int, success } from './utils';

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

    const mockResources = async (planetId: UUID) => {
        await module.mockBuildings(planetId, {
            MetalMine: 20,
            CrystalMine: 20,
            DeuteriumSynthesizer: 20,
            SolarPlant: 35,
        });
        module.clock.fastForwardOneMonth();
    };

    interface Payload {
        planetId: UUID;
        techId: string;
        level: number;
        cost: Resources;
    }

    const canStart = async ({ planetId, techId, level, cost }: Payload) => {
        await mockResources(planetId);
        const beforePlanet = await module.getPlanet(planetId);
        expect(beforePlanet.research).toBeNull();

        const request = researchStart({
            planetId,
            techId,
            level,
        });
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
        return research;
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

    const TestResearch = (options: Payload) => ({
        canStart: () => canStart(options),
        canCancel: () => canCancel(options),
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

            noLab('EnergyTechnology');
            noLab('ArmourTechnology');

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

        it('can start researching EnergyTechnology', () => energy1.canStart());

        it('can start researching ArmourTechnology', () => armour1.canStart());

        it('cannot research if already researching', async () => {
            await energy1.canStart();
            const request = researchStart({
                planetId,
                techId: 'ArmourTechnology',
                level: 1,
            });
            await failure(request, PlanetAlreadyResearchingException);
        });

        it.todo('cannot research if another Colony is researching');

        describe('Cancel', () => {
            it('cannot cancel if not researching anything', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.research).toBeNull();

                const request = cancel(planetId);
                await failure(request, PlanetNotResearchingException);
            });

            it('can cancel EnergyTechnology', () => energy1.canCancel());
            it('can cancel ArmourTechnology', () => armour1.canCancel());
        });

        // TODO same cost resources
        // TODO finish

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
                const { end, start } = await energy1.canStart();
                const duration = end - start;
                // tslint:disable-next-line: no-magic-numbers
                expect(duration).toBe(1440000);
            });

            it('ArmourTechnology has same duration', async () => {
                await module.mockBuildings(planetId, { ResearchLab: 2 });
                const { end, start } = await armour1.canStart();
                const duration = end - start;
                // tslint:disable-next-line: no-magic-numbers
                expect(duration).toBe(1200000);
            });

            it('ResearchLab improves research speed', async () => {
                let lastDuration: number = Number.POSITIVE_INFINITY;
                let mass: number = 0;

                const MAX_LEVEL = 30;
                for (let level = 1; level <= MAX_LEVEL; level += 1) {
                    await module.mockBuildings(planetId, {
                        ResearchLab: level,
                    });
                    const { end, start } = await energy1.canStart();
                    await success(cancel(planetId));
                    const duration = end - start;
                    expect(duration).toBeLessThan(lastDuration);
                    const speed = 1 + level;
                    if (level > 1) {
                        expect(duration * speed).toBeApprox(mass);
                    } else {
                        mass = duration * speed;
                    }
                    lastDuration = duration;
                }
            });

            it.todo('Intergalactic Researcg Network');
        });
    });
});
