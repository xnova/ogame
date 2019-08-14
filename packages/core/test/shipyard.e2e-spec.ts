import { UUID } from 'io-ts-types/lib/UUID';

import {
    ShipyardFinishCommand,
    ShipyardStartCommand,
} from '../src/planet/commands';
import {
    InvalidLevelException,
    PlanetAlreadyBusyException,
    PlanetNotBusyException,
    PlanetNotEnoughResourcesException,
    PlanetNotFinishedException,
    RequirementsAreNotMeetException,
    TooMuchLevelException,
    UnitNotFoundException,
} from '../src/planet/exceptions';
import { Resources } from '../src/shared/resources';
import { SECOND } from '../src/utils';

import './jest-extender';
import { PlanetTestModule } from './PlanetTestModule';
import { ArgsType, failure, generateUUID, int, success } from './utils';

const SHIPS = [
    'SmallCargo',
    'LargeCargo',
    'LightFighter',
    'HeavyFighter',
    'Cruiser',
    'Battleship',
    'ColonyShip',
    'Recycler',
    'EspionageProbe',
    'Bomber',
    'SolarSatellite',
    'Destroyer',
    'Deathstar',
    'Battlecruiser',
];

const DEFENSES = [
    'RocketLauncher',
    'LightLaser',
    'HeavyLaser',
    'GaussCannon',
    'IonCannon',
    'PlasmaTurret',
    'SmallShieldDome',
    'LargeShieldDome',
];

const UNITS = [...SHIPS, ...DEFENSES];

describe('PlanetModule', () => {
    let module: PlanetTestModule;

    const start = (options: {
        planetId: UUID;
        unitId: string;
        quantity: number;
    }) =>
        module.execute(
            new ShipyardStartCommand({
                ms: module.clock.now(),
                ...options,
                quantity: int(options.quantity),
            }),
        );

    const finish = (planetId: UUID) =>
        module.execute(
            new ShipyardFinishCommand({ ms: module.clock.now(), planetId }),
        );

    type Payload = ArgsType<typeof start>[0] & {
        cost: Resources;
    };

    const canStart = async ({ planetId, unitId, quantity, cost }: Payload) => {
        await module.mockResources(planetId);
        const beforePlanet = await module.getPlanet(planetId);
        expect(beforePlanet.shipyard).toBeNull();

        const request = start({ planetId, unitId, quantity });
        await success(request);

        const { shipyard, resources } = await module.getPlanet(planetId);
        if (!shipyard) {
            return fail('planet shipyard not found');
        }
        expect(shipyard.id).toBe(unitId);
        expect(shipyard.quantity).toBe(quantity);

        const paid = beforePlanet.resources.subtract(resources);
        expect(paid).toBeResources(cost.multiply(quantity));

        const duration = shipyard.end - shipyard.start;
        // duration is positive
        expect(duration).toBeGreaterThan(0);
        return { ...shipyard, duration };
    };

    const canFinish = async (options: Payload) => {
        const beforePlanet = await module.getPlanet(options.planetId);

        const { duration } = await canStart(options);
        module.clock.fastForward(duration);
        const request = finish(options.planetId);
        await success(request);

        const planet = await module.getPlanet(options.planetId);
        expect(planet.shipyard).toBeNull();
        const deltaQuantity: number =
            (planet.quantities[options.unitId] || 0) -
            (beforePlanet.quantities[options.unitId] || 0);
        expect(deltaQuantity).toBe(options.quantity);
        return duration;
    };

    const TestShipyard = (options: Payload) => ({
        canStart: () => canStart(options),
        canFinish: () => canFinish(options),
    });

    beforeEach(async () => {
        module = new PlanetTestModule();
        await module.init();
    });

    describe('Shipyard', () => {
        const planetId = generateUUID();

        beforeEach(async () => {
            await module.createPlanet(planetId);
            await module.mockBuildings(planetId, { Shipyard: 2 });
            await module.mockTechnologies(planetId, { CombustionDrive: 2 });
        });

        it('cannot build non existing unit', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.shipyard).toBeNull();

            const request = start({
                planetId,
                unitId: 'Foo',
                quantity: 1,
            });
            await failure(request, UnitNotFoundException);
        });

        it('cannot build negative quantities', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.shipyard).toBeNull();

            const request = start({
                planetId,
                unitId: 'SmallCargo',
                quantity: -1,
            });
            await failure(request, InvalidLevelException);
        });

        it('cannot build 0 quantity', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.shipyard).toBeNull();

            const request = start({
                planetId,
                unitId: 'SmallCargo',
                quantity: 0,
            });
            await failure(request, InvalidLevelException);
        });

        describe('cannot build withoud a Shipyard', () => {
            beforeEach(async () => {
                await module.mockBuildings(planetId, { Shipyard: 0 });
                await module.mockResources(planetId);
            });

            const noShipyard = (unitId: string) => {
                it(`cannot build ${unitId} withoud a Shipyard`, async () => {
                    const beforePlanet = await module.getPlanet(planetId);
                    expect(beforePlanet.shipyard).toBeNull();

                    const request = start({
                        planetId,
                        unitId,
                        quantity: 1,
                    });
                    await failure(request, RequirementsAreNotMeetException);
                });
            };

            for (const unitId of UNITS) {
                noShipyard(unitId);
            }

            // even if not in requirements and other requirements are meet
        });

        it('cannot build 1xRocketLauncher if not enough resources', async () => {
            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.shipyard).toBeNull();

            const request = start({
                planetId,
                unitId: 'RocketLauncher',
                quantity: 1,
            });
            await failure(request, PlanetNotEnoughResourcesException);
        });

        it('cannot build 10xRocketLauncher if not enough resources', async () => {
            // mock enough resources for 1 rocket, but not for 10
            module.clock.fastForwardOneMonth();

            const beforePlanet = await module.getPlanet(planetId);
            expect(beforePlanet.shipyard).toBeNull();

            const request = start({
                planetId,
                unitId: 'RocketLauncher',
                quantity: 10,
            });
            await failure(request, PlanetNotEnoughResourcesException);
        });

        const smallCargo1 = TestShipyard({
            planetId,
            unitId: 'SmallCargo',
            quantity: 1,
            cost: Resources.Partial({
                metal: 2000,
                crystal: 2000,
            }),
        });

        const rocket1 = TestShipyard({
            planetId,
            unitId: 'RocketLauncher',
            quantity: 1,
            cost: Resources.Partial({
                metal: 2000,
            }),
        });

        const rocket100 = TestShipyard({
            planetId,
            unitId: 'RocketLauncher',
            quantity: 100,
            cost: Resources.Partial({
                metal: 2000,
            }),
        });

        const smallCargo1000 = TestShipyard({
            planetId,
            unitId: 'SmallCargo',
            quantity: 1000,
            cost: Resources.Partial({
                metal: 2000,
                crystal: 2000,
            }),
        });

        it('can start building 1xSmallCargo', () => smallCargo1.canStart());
        it('can start building 1xRocketLauncher', () => rocket1.canStart());
        it('can start building 100xRocketLauncher', () => rocket100.canStart());
        it('can start building 1000xSmallCargo', () =>
            smallCargo1000.canStart());

        // TODO different with queues
        it('cannot build if already building', async () => {
            await smallCargo1.canStart();
            const request = start({
                planetId,
                unitId: 'RocketLauncher',
                quantity: 1,
            });
            await failure(request, PlanetAlreadyBusyException);
        });

        describe('LERP Building', () => {
            it('builds RocketLauncher unit by unit', async () => {
                const { duration } = await rocket100.canStart();
                module.clock.fastForward(duration / 2 + SECOND);
                const planet = await module.getPlanet(planetId);
                const quantity = planet.quantities.RocketLauncher;
                expect(quantity).toBe(50);
            });

            it('builds SmallCargo unit by unit', async () => {
                const { duration } = await smallCargo1000.canStart();
                module.clock.fastForward(duration / 4 + SECOND);
                const planet = await module.getPlanet(planetId);
                const quantity = planet.quantities.SmallCargo;
                expect(quantity).toBe(250);
            });

            it('builds SmallCargo unit by unit, its also additive', async () => {
                await module.mockShipyard(planetId, { SmallCargo: 23 });
                const { duration } = await smallCargo1000.canStart();
                module.clock.fastForward(duration / 2 + SECOND);
                const planet = await module.getPlanet(planetId);
                const quantity = planet.quantities.SmallCargo;
                expect(quantity).toBe(500 + 23);
            });

            it('builds RocketLauncher unit by unit, until ends', async () => {
                const { duration } = await rocket100.canStart();
                module.clock.fastForward(duration * 3);
                const planet = await module.getPlanet(planetId);
                const quantity = planet.quantities.RocketLauncher;
                expect(quantity).toBe(100);
            });

            it('builds SmallCargo unit by unit, until ends', async () => {
                const { duration } = await smallCargo1000.canStart();
                module.clock.fastForward(duration * 2 + SECOND);
                const planet = await module.getPlanet(planetId);
                const quantity = planet.quantities.SmallCargo;
                expect(quantity).toBe(1000);
            });
        });

        describe('Finish', () => {
            it('cannot finish if not building', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = finish(planetId);
                await failure(request, PlanetNotBusyException);
            });

            it('cannot finish building before it ends', async () => {
                await rocket1.canStart();
                module.clock.fastForward(1);

                const request = finish(planetId);
                await failure(request, PlanetNotFinishedException);
            });

            it('can finish 1xSmallCargo', () => smallCargo1.canFinish());
            it('can finish 1xRocketLauncher', () => rocket1.canFinish());
            it('can finish 100xRocketLauncher', () => rocket100.canFinish());

            it('additive quantity', async () => {
                await rocket100.canFinish();
                await rocket100.canFinish();
                await rocket100.canFinish();
                const planet = await module.getPlanet(planetId);
                // tslint:disable-next-line: no-magic-numbers
                expect(planet.quantities.RocketLauncher).toBe(300);
            });
        });

        // TODO same cost resources

        describe('1 MAX ShieldDomes', () => {
            beforeEach(async () => {
                await module.mockResources(planetId);
                // mocks requirements
                await module.mockBuildings(planetId, { Shipyard: 6 });
                await module.mockTechnologies(planetId, {
                    ShieldingTechnology: 6,
                });
            });

            it('cannot build more than 1 SmallShieldDome', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'SmallShieldDome',
                    quantity: 2,
                });
                await failure(request, TooMuchLevelException);
            });

            it('cannot build more than 1 LargeShieldDome', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'LargeShieldDome',
                    quantity: 2,
                });
                await failure(request, TooMuchLevelException);
            });

            it('cannot have more than 1 SmallShieldDome', async () => {
                await module.mockShipyard(planetId, { SmallShieldDome: 1 });
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'SmallShieldDome',
                    quantity: 1,
                });
                await failure(request, TooMuchLevelException);
            });

            it('cannot have more than 1 LargeShieldDome', async () => {
                await module.mockShipyard(planetId, { LargeShieldDome: 1 });
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'LargeShieldDome',
                    quantity: 1,
                });
                await failure(request, TooMuchLevelException);
            });

            it('can build exactly 1 SmallShieldDome', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'SmallShieldDome',
                    quantity: 1,
                });
                await success(request);
            });

            it('can build exactly 1 LargeShieldDome', async () => {
                const beforePlanet = await module.getPlanet(planetId);
                expect(beforePlanet.shipyard).toBeNull();

                const request = start({
                    planetId,
                    unitId: 'LargeShieldDome',
                    quantity: 1,
                });
                await success(request);
            });
        });

        describe('Duration', () => {
            beforeEach(async () => {
                await module.mockResources(planetId);
            });

            // TODO has same duration as OGame

            it(`Shipyard level improves building speed`, () =>
                module.expectImprovesSpeed({
                    planetId,
                    buildingId: 'Shipyard',
                    speed: level => 1 + level,
                    duration: () => rocket1.canFinish(),
                }));

            const BASE_SPEED = 2;
            it(`Nanite level improves building speed`, () =>
                module.expectImprovesSpeed({
                    planetId,
                    buildingId: 'NaniteFactory',
                    speed: level => Math.pow(BASE_SPEED, level),
                    duration: () => rocket100.canFinish(),
                }));
        });
    });
});
