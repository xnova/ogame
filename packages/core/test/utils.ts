import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';
import * as uuid from 'uuid';

import { Resources } from '../src/shared/resources';
import { valueOrThrow } from '../src/shared/types';
import { sum, Type } from '../src/utils';

// https://stackoverflow.com/a/54719658
export type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

export const niceError = async <T>(promise: Promise<T>): Promise<T> => {
    try {
        return await promise;
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        // tslint:disable-next-line: no-console
        console.trace(err);
        const potentialError = new Error();
        potentialError.message = String(err);
        throw potentialError;
    }
};

export const resourceDist = (a: Resources) => (b: Resources): number =>
    sum(
        b
            .subtract(a)
            .values()
            .map(x => Math.abs(x)),
    );

export const generateUUID = uuid.v4 as () => UUID;

export const int = valueOrThrow(t.Int);

export const success = async (request: Promise<any>) =>
    expect(await request).toBe(undefined);

export const failure = <E extends Error>(
    request: Promise<any>,
    error: Type<E>,
) => expect(request).rejects.toThrowError(error);
