import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const ResearchCancelledEventC = t.type({
    ms: t.number,
    planetId: UUID,
    techId: t.string,
    level: t.Int,
});

export type ResearchCancelledEventT = t.TypeOf<typeof ResearchCancelledEventC>;

export class ResearchCancelledEvent extends Event<ResearchCancelledEventT> {}
