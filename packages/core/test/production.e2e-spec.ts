import { Resource, Resources } from '../src/shared/resources';
import { HOUR } from '../src/utils';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { generateUUID } from './utils';

// TODO is a constant or a parameter???
const BASIC_INCOME: Resources = Resources.Partial({ metal: 45, crystal: 15 });
const INITIAL_RESOURCES = Resources.Partial({ metal: 500, crystal: 500 });

const MINES_1_PRODUCTION = Resources.Partial({
    metal: 33,
    crystal: 22,
    deuterium: 11,
});

const MAP_LEVEL_CAPACITY = {
    1: 20,
    2: 40,
    3: 75,
    4: 140,
    5: 255,
    6: 470,
    7: 865,
    8: 1590,
    9: 2920,
    10: 5355,
    11: 9820,
    12: 18005,
    13: 33005,
    14: 60510,
    15: 110925,
};
const KILO = 1000;
Object.keys(MAP_LEVEL_CAPACITY).map(key => {
    MAP_LEVEL_CAPACITY[key] *= KILO;
});

const formatNum = (n: number): string => Number(n).toLocaleString();

describe('PlanetModule', () => {
    let module: PlanetTestModule;
    const planetId = generateUUID();

    const getProduction = async (
        mines: Record<string, number>,
        time: number = HOUR,
    ): Promise<{ produced: Resources; productionFactor: number }> => {
        const beforePlanet = await module.getPlanet(planetId);
        await module.mockBuildings(planetId, mines);
        module.clock.fastForward(time);
        const planet = await module.getPlanet(planetId);
        const produced = planet.resources.subtract(beforePlanet.resources);
        return { produced, productionFactor: planet.productionFactor };
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
            const { produced } = await getProduction({});
            expect(produced).toBeResources(BASIC_INCOME);
        });

        const cannotProduceWithoutEnergy = (
            resource: Resource,
            buildingId: string,
        ) => {
            it(`${buildingId} cannot produce ${resource} without energy`, async () => {
                const { produced, productionFactor } = await getProduction({
                    [buildingId]: 1,
                });
                const producedByMine = produced.subtract(BASIC_INCOME);
                expect(producedByMine[resource]).toBe(0);
                expect(produced.energy).toBe(0);
                expect(productionFactor).toBe(0);
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
                const { produced, productionFactor } = await getProduction({
                    [buildingId]: 1,
                    SolarPlant: 10,
                });
                const producedByMine = produced.subtract(BASIC_INCOME);
                expect(producedByMine[resource]).toBe(expected);
                expect(produced.energy).toBe(0);
                expect(productionFactor).toBe(1);
            });
        };

        canProduceWithEnoughEnergy(
            'metal',
            'MetalMine',
            MINES_1_PRODUCTION.metal,
        );
        canProduceWithEnoughEnergy(
            'crystal',
            'CrystalMine',
            MINES_1_PRODUCTION.crystal,
        );
        canProduceWithEnoughEnergy(
            'deuterium',
            'DeuteriumSynthesizer',
            MINES_1_PRODUCTION.deuterium,
        );

        describe('is monotonic', () => {
            // increasing a mine level cannot produce less resources
            // even if no enough energy is provided
            let metal: number = 0;
            let crystal: number = Number.POSITIVE_INFINITY;
            let lastFactor: number = Number.POSITIVE_INFINITY;

            const atLevel = (level: number) => {
                it(`at level ${level}`, async () => {
                    const { produced, productionFactor } = await getProduction({
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
                    expect(productionFactor).toBeLessThanOrEqual(lastFactor);
                    lastFactor = productionFactor;
                });
            };

            const MAX_LEVEL = 30;
            for (let level = 1; level <= MAX_LEVEL; level += 1) {
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

        it(`new planet only produces up to 10,000`, async () => {
            module.clock.fastForwardOneMonth();
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
                module.clock.fastForwardOneYear();
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
            for (const [level, capacity] of Object.entries(
                MAP_LEVEL_CAPACITY,
            )) {
                testCapacity({
                    buildingId: 'MetalStorage',
                    resource: 'metal',
                    level: parseInt(level, 10),
                    capacity,
                });
                testCapacity({
                    buildingId: 'CrystalStorage',
                    resource: 'crystal',
                    level: parseInt(level, 10),
                    capacity,
                });
                testCapacity({
                    buildingId: 'DeuteriumTank',
                    resource: 'deuterium',
                    level: parseInt(level, 10),
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
            module.clock.fastForwardOneDay();
            const beforePlanet = await module.getPlanet(planetId);

            await module.mockBuildings(planetId, {
                MetalStorage: 0,
                CrystalStorage: 0,
                DeuteriumSynthesizer: 0,
            });
            module.clock.fastForwardOneDay();
            const planet = await module.getPlanet(planetId);

            expect(planet.resources).toBeResources(beforePlanet.resources);
        });

        it.todo('cannot store energy');
    });
});
