import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';

export const BuildStartedEventC = t.type({
    ms: t.number, // FIXME: stupid duplication with start
    planetId: UUID,
    buildingId: t.string,
    level: t.Int,
    start: t.number,
    end: t.number,
});

export type BuildStartedEventT = t.TypeOf<typeof BuildStartedEventC>;

export class BuildStartedEvent extends Event<BuildStartedEventT> {}
