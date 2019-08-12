import { PlayerJoinCommand } from '../src/planet/commands';
import {
    PlanetAlreadyCreatedException,
    PlayerAlreadyJoinedException,
    PointAlreadyOccupiedException,
} from '../src/planet/exceptions';
import { PointT } from '../src/shared/Point';

import { PlanetTestModule } from './PlanetTestModule';
import { failure, generateUUID, int, success } from './utils';

describe('PlanetModule', () => {
    let module: PlanetTestModule;

    const playerId = generateUUID();
    const planetId = generateUUID();
    const point: PointT = {
        x: int(1),
        y: int(1),
        z: int(1),
        t: int(1),
    };
    const otherPoint: PointT = { ...point, x: int(point.x + 1) };
    const temperature = 69;

    const join = (payload: Partial<PlayerJoinCommand['payload']> = {}) => {
        const command = new PlayerJoinCommand({
            ms: module.clock.now(),
            playerId,
            planetId,
            point,
            temperature: int(temperature),
            ...payload,
        });
        return module.execute(command);
    };

    beforeAll(async () => {
        module = new PlanetTestModule();
        await module.init();
    });

    describe('PlayerJoin', () => {
        it('can send command', async () => {
            const byId = module.getPlanetById(planetId);
            const byPoint = module.getPlanetByPoint(point);
            expect(await byId).toBe(undefined);
            expect(await byPoint).toBe(undefined);

            const request = join();
            await success(request);

            const planet = await module.getPlanetById(planetId);
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
            expect(planet.temperature).toBe(temperature);
        });

        it('find planet by position', async () => {
            // destructuring is to create a new copy,
            // because we want to be sure is not being matched by reference
            const planet = await module.getPlanetByPoint({ ...point });
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
        });

        it('only creates one planet', async () => {
            const withOtherId = module.getPlanetById(generateUUID());
            expect(await withOtherId).toBe(undefined);

            const withOtherGalaxy = module.getPlanetByPoint(otherPoint);
            expect(await withOtherGalaxy).toBe(undefined);
        });

        it('player cannot join again', async () => {
            const request = join({
                planetId: generateUUID(),
                point: otherPoint,
            });
            await failure(request, PlayerAlreadyJoinedException);
        });

        it('cannot create a planet on the same place', async () => {
            const request = join({
                playerId: generateUUID(),
                planetId: generateUUID(),
            });
            await failure(request, PointAlreadyOccupiedException);
        });

        it('cannot create a planet with the same id', async () => {
            const request = join({
                playerId: generateUUID(),
                point: otherPoint,
            });
            await failure(request, PlanetAlreadyCreatedException);
        });
    });
});
