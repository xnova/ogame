import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { ResourcesC } from './resources';

export const valueOrThrow = <A, O, I>(codec: t.Type<A, O, I>) => (
    value: I,
): A =>
    pipe(
        codec.decode(value),
        fold(
            () => {
                throw Error('invalid value');
            },
            _ => _,
        ),
    );

export const Universe = t.type({
    id: UUID,
    name: t.string,
    initialResources: ResourcesC,
});
export type Universe = t.TypeOf<typeof Universe>;

export const floor = (n: number): t.Int =>
    // tslint:disable-next-line: no-bitwise
    ((Math.floor(n) | 0) as unknown) as t.Int;

export const addInt = (a: t.Int) => (b: t.Int): t.Int =>
    ((a + b) as unknown) as t.Int;
