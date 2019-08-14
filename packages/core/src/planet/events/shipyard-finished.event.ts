import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const ShipyardFinishedEventC = t.type({
    ms: t.number,
    planetId: UUID,
    unitId: t.string,
    quantity: t.Int,
});

export type ShipyardFinishedEventT = t.TypeOf<typeof ShipyardFinishedEventC>;

export class ShipyardFinishedEvent extends Event<ShipyardFinishedEventT> {}
