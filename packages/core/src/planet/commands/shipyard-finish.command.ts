import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const ShipyardFinishCommandC = t.type({
    ms: t.number,
    planetId: UUID,
});

export type ShipyardFinishCommandT = t.TypeOf<typeof ShipyardFinishCommandC>;

export class ShipyardFinishCommand extends Command<ShipyardFinishCommandT> {}
