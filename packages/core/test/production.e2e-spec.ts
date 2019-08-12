import { Resource, Resources } from '../src/shared/resources';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { generateUUID } from './utils';

// TODO is a constant or a parameter???
const BASIC_INCOME: Resources = Resources.Partial({ metal: 45, crystal: 15 });
const INITIAL_RESOURCES = Resources.Partial({ metal: 500, crystal: 500 });

const formatNum = (n: number): string => Number(n).toLocaleString();

describe('PlanetModule', () => {
    let module: PlanetTestModule;
    const planetId = generateUUID();

    const getProduction = async (
        mines: Record<string, number>,
        time: number = 3600 * 1000,
    ): Promise<Resources> => {
        const beforePlanet = await module.getPlanet(planetId);
        await module.mockBuildings(planetId, mines);
        module.clock.fastForward(time);
        const { resources } = await module.getPlanet(planetId);
        const produced = resources.subtract(beforePlanet.resources);
        return produced;
    };

    beforeEach(async () => {
        module = new PlanetTestModule();
        await module.init();
        await module.createPlanet(planetId);
    });

    describe('Production', () => {
        it('new planet has inital resources', async () => {
            const { resources } = await module.getPlanet(planetId);
            expect(resources).toBeResources(INITIAL_RESOURCES);
        });

        it('new planet has basic income', async () => {
            const produced = await getProduction({});
            expect(produced).toBeResources(BASIC_INCOME);
        });

        const cannotProduceWithoutEnergy = (
            resource: Resource,
            buildingId: string,
        ) => {
            it(`${buildingId} cannot produce ${resource} without energy`, async () => {
                const produced = await getProduction({ [buildingId]: 1 });
                const producedByMine = produced.subtract(BASIC_INCOME);
                expect(producedByMine[resource]).toBe(0);
                expect(produced.energy).toBe(0);
                // TODO productionFactor is 0?
            });
        };

        cannotProduceWithoutEnergy('metal', 'MetalMine');
        cannotProduceWithoutEnergy('crystal', 'CrystalMine');
        cannotProduceWithoutEnergy('deuterium', 'DeuteriumSynthesizer');

        const canProduceWithEnoughEnergy = (
            resource: Resource,
            buildingId: string,
            expected: number,
        ) => {
            it(`${buildingId} produces ${resource} given enough energy`, async () => {
                const produced = await getProduction({
                    [buildingId]: 1,
                    SolarPlant: 10,
                });
                const producedByMine = produced.subtract(BASIC_INCOME);
                expect(producedByMine[resource]).toBe(expected);
                expect(produced.energy).toBe(0);
                // TODO productionFactor is 1?
            });
        };

        canProduceWithEnoughEnergy('metal', 'MetalMine', 33);
        canProduceWithEnoughEnergy('crystal', 'CrystalMine', 22);
        canProduceWithEnoughEnergy('deuterium', 'DeuteriumSynthesizer', 11);

        describe('is monotonic', () => {
            // increasing a mine level cannot produce less resources
            // even if no enough energy is provided
            let metal: number = 0;
            let crystal: number = Number.POSITIVE_INFINITY;

            const atLevel = (level: number) => {
                it(`at level ${level}`, async () => {
                    const produced = await getProduction({
                        MetalMine: level,
                        CrystalMine: 1,
                        SolarPlant: 5,
                    });
                    const producedByMine = produced.subtract(BASIC_INCOME);

                    expect(produced.energy).toBe(0);
                    expect(producedByMine.metal).toBeGreaterThan(metal);
                    metal = producedByMine.metal;
                    // at first, when given enough energy, crystal is constant
                    expect(producedByMine.crystal).toBeLessThanOrEqual(crystal);
                    crystal = producedByMine.crystal;
                });
            };

            for (let level = 1; level <= 30; level += 1) {
                atLevel(level);
            }
        });

        // TODO cannot have negative resources NEVER

        // it.todo('cannot produce energy');

        it.todo('SolarPlant produces energy');
        it.todo('FusionReactor produces energy and consumes deuterium');
        it.todo('SolarSatellite produces energy');
        it.todo('SolarSatellite production is influenced by temperature');

        it.todo('PlasmaTechnology boosts produced resources');

        it.todo('deuterium production is influenced by temperature');

        it.todo('production factor auto?');

        it.todo('stop consuming deuterium when exhausted (fusion plant)');
    });

    describe('Storage', () => {
        // TODO

        beforeEach(async () => {
            // ensure enough production
            await module.mockBuildings(planetId, {
                MetalMine: 40,
                CrystalMine: 40,
                DeuteriumSynthesizer: 40,
                SolarPlant: 60,
            });
        });

        it(`new planet only produces up to ${formatNum(10000)}`, async () => {
            module.clock.fastForward(30 * 24 * 3600 * 1000);
            const { resources } = await module.getPlanet(planetId);
            expect(resources).toBeResources(
                Resources.Partial({
                    metal: 10000,
                    crystal: 10000,
                    deuterium: 10000,
                }),
            );
        });

        const testCapacity = ({
            level,
            resource,
            capacity,
            buildingId,
        }: {
            buildingId: string;
            resource: string;
            level: number;
            capacity: number;
        }) => {
            it(`${buildingId}@${level} can hold up to ${formatNum(
                capacity,
            )} ${resource}`, async () => {
                await module.mockBuildings(planetId, { [buildingId]: level });
                module.clock.fastForward(12 * 30 * 24 * 3600 * 1000);
                const { resources } = await module.getPlanet(planetId);
                expect(resources).toBeResources(
                    Resources.Partial({
                        metal: 10000,
                        crystal: 10000,
                        deuterium: 10000,
                        [resource]: capacity,
                    }),
                );
            });
        };

        describe('Capacity', () => {
            const STORAGES = [
                10,
                20,
                40,
                75,
                140,
                255,
                470,
                865,
                1590,
                2920,
                5355,
                9820,
                18005,
                33005,
                60510,
                110925,
            ].map(x => x * 1000);
            for (const [level, capacity] of STORAGES.entries()) {
                testCapacity({
                    buildingId: 'MetalStorage',
                    resource: 'metal',
                    level,
                    capacity,
                });
                testCapacity({
                    buildingId: 'CrystalStorage',
                    resource: 'crystal',
                    level,
                    capacity,
                });
                testCapacity({
                    buildingId: 'DeuteriumTank',
                    resource: 'deuterium',
                    level,
                    capacity,
                });
            }
        });

        // if resources overflow, production doesnt eliminate it.
        it('storage is only a limit to produced resources', async () => {
            await module.mockBuildings(planetId, {
                MetalStorage: 10,
                CrystalStorage: 10,
                DeuteriumSynthesizer: 10,
            });
            module.clock.fastForward(24 * 3600 * 1000);
            const beforePlanet = await module.getPlanet(planetId);

            await module.mockBuildings(planetId, {
                MetalStorage: 0,
                CrystalStorage: 0,
                DeuteriumSynthesizer: 0,
            });
            module.clock.fastForward(24 * 3600 * 1000);
            const planet = await module.getPlanet(planetId);

            expect(planet.resources).toBeResources(beforePlanet.resources);
        });

        it.todo('cannot store energy');
    });
});
