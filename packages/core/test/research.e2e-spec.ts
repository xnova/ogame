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

        it('cannot cancel if not researching anything', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = cancel(planetId);
            await failure(request, PlanetNotResearchingException);
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

            it('cannot research EnergyTechnology withoud a Lab', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.research).toBeNull();

                const request = researchStart({
                    planetId,
                    techId: 'EnergyTechnology',
                    level: 1,
                });
                await failure(request, RequirementsAreNotMeetException);
            });

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

        it('can start researching EnergyTechnology', async () => {
            await mockResources(planetId);
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.research).toBeNull();

            const request = researchStart({
                planetId,
                techId: 'EnergyTechnology',
                level: 1,
            });
            await success(request);

            const { research, resources } = await module.getPlanet(planetId);
            if (!research) {
                return fail('planet research not found');
            }
            expect(research.id).toBe('EnergyTechnology');
            expect(research.level).toBe(1);

            const paid = beforePlanet.resources.subtract(resources);
            const cost = Resources.Partial({ crystal: 800, deuterium: 400 });
            expect(paid).toBeResources(cost);

            const duration = research.end - research.start;
            // duration is positive
            expect(duration).toBeGreaterThan(0);
        });

        it('cannot research if already researching', async () => {
            const { research } = await module.getPlanet(planetId);
            expect(research).toBeNull();

            await mockResources(planetId);
            const request = researchStart({
                planetId,
                techId: 'EnergyTechnology',
                level: 1,
            });
            await success(request);

            // FIXME awful name: request2
            const request2 = researchStart({
                planetId,
                techId: 'ArmourTechnology',
                level: 1,
            });
            await failure(request2, PlanetAlreadyResearchingException);
        });

        it.todo('cannot research if another Colony is researching');

        // TODO same cost resources
        // TODO finish
        // TODO cancel

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

        it.todo('same duration as OGame');

        it.todo('research lab improves research speed');
    });
});
