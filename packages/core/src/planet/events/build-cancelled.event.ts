import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const BuildCancelledEventC = t.type({
    ms: t.number,
    planetId: UUID,
    buildingId: t.string,
    level: t.Int,
});

export type BuildCancelledEventT = t.TypeOf<typeof BuildCancelledEventC>;

export class BuildCancelledEvent extends Event<BuildCancelledEventT> {}
