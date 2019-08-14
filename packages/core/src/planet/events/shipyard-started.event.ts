import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const ShipyardStartedEventC = t.type({
    ms: t.number, // FIXME: stupid duplication with start
    planetId: UUID,
    unitId: t.string,
    quantity: t.Int,
    start: t.number,
    end: t.number,
});

export type ShipyardStartedEventT = t.TypeOf<typeof ShipyardStartedEventC>;

export class ShipyardStartedEvent extends Event<ShipyardStartedEventT> {}
