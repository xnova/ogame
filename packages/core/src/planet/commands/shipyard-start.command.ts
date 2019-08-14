import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const ShipyardStartCommandC = t.type({
    ms: t.number,
    planetId: UUID,
    unitId: t.string,
    quantity: t.Int,
});

export type ShipyardStartCommandT = t.TypeOf<typeof ShipyardStartCommandC>;

export class ShipyardStartCommand extends Command<ShipyardStartCommandT> {}
