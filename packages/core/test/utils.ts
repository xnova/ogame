import { UUID } from 'io-ts-types/lib/UUID';
import * as uuid from 'uuid';

import { Resources } from '../src/shared/resources';

export const niceError = async <T>(promise: Promise<T>): Promise<T> => {
    try {
        return await promise;
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.trace(err);
        const potentialError = new Error();
        potentialError.message =
            err instanceof Error ? err.message : String(err);
        throw potentialError;
    }
};

const add = (a: number, b: number) => a + b;
export const sum = (xs: number[]): number => xs.reduce(add, 0);

export const resourceDist = (a: Resources) => (b: Resources): number =>
    sum(
        b
            .subtract(a)
            .values()
            .map(x => Math.abs(x)),
    );

export const generateUUID = uuid.v4 as () => UUID;
