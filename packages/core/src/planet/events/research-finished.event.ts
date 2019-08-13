import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const ResearchFinishedEventC = t.type({
    ms: t.number,
    planetId: UUID,
    techId: t.string,
    level: t.Int,
});

export type ResearchFinishedEventT = t.TypeOf<typeof ResearchFinishedEventC>;

export class ResearchFinishedEvent extends Event<ResearchFinishedEventT> {}
