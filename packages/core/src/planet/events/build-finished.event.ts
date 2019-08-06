import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const BuildFinishedEventC = t.type({
    ms: t.number,
    planetId: UUID,
    buildingId: t.string,
    level: t.Int,
});

export type BuildFinishedEventT = t.TypeOf<typeof BuildFinishedEventC>;

export class BuildFinishedEvent extends Event<BuildFinishedEventT> {}
