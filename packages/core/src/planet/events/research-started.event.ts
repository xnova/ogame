import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const ResearchStartedEventC = t.type({
    ms: t.number, // FIXME: stupid duplication with start
    planetId: UUID,
    techId: t.string,
    level: t.Int,
    start: t.number,
    end: t.number,
});

export type ResearchStartedEventT = t.TypeOf<typeof ResearchStartedEventC>;

export class ResearchStartedEvent extends Event<ResearchStartedEventT> {}
