import * as t from 'io-ts';

import { PlayerJoinCommand } from '../src/planet/commands';
import {
    PlanetAlreadyCreatedException,
    PlayerAlreadyJoinedException,
    PointAlreadyOccupiedException,
} from '../src/planet/exceptions';
import { PointT } from '../src/shared/Point';
import { Resources } from '../src/shared/resources';
import { valueOrThrow } from '../src/shared/types';

import { PlanetTestModule } from './PlanetTestModule';
import { generateUUID, resourceDist } from './utils';

const EPSILON = 0.01;
const INITIAL_RESOURCES = Resources.Partial({ metal: 500, crystal: 500 });

const int = valueOrThrow(t.Int);

describe('PlanetModule', () => {
    let module: PlanetTestModule;

    const playerId = generateUUID();
    const planetId = generateUUID();
    const point: PointT = {
        x: 1 as any,
        y: 1 as any,
        z: 8 as any,
        t: 1 as any,
    };
    const otherPoint: PointT = { ...point, x: (point.x + 1) as any };
    const temperature = int(69);

    const joinCommand = () =>
        new PlayerJoinCommand({
            ms: module.clock.now(),
            playerId,
            planetId,
            point,
            temperature,
        });

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

            const request = module.execute(joinCommand());
            expect(await request).toBe(undefined);

            const planet = await module.getPlanetById(planetId);
            if (!planet) {
                return fail('planet not found');
            }
            expect(planet.id).toBe(planetId);
            expect(planet.temperature).toBe(temperature);
            // TODO move to production tests
            expect(
                resourceDist(planet.resources)(INITIAL_RESOURCES),
            ).toBeLessThan(EPSILON);
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
            const command = new PlayerJoinCommand({
                ...joinCommand().payload,
                planetId: generateUUID(),
                point: otherPoint,
            });
            const request = module.execute(command);
            await expect(request).rejects.toThrowError(
                PlayerAlreadyJoinedException,
            );
        });

        it('cannot create a planet on the same place', async () => {
            const command = new PlayerJoinCommand({
                ...joinCommand().payload,
                playerId: generateUUID(),
                planetId: generateUUID(),
            });
            const request = module.execute(command);
            await expect(request).rejects.toThrowError(
                PointAlreadyOccupiedException,
            );
        });

        it('cannot create a planet with the same id', async () => {
            const command = new PlayerJoinCommand({
                ...joinCommand().payload,
                playerId: generateUUID(),
                point: otherPoint,
            });
            const request = module.execute(command);
            await expect(request).rejects.toThrowError(
                PlanetAlreadyCreatedException,
            );
        });
    });
});
