import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Event } from '../../event';
import { PointC } from '../../shared/Point';

export const PlayerJoinedEventC = t.type({
    ms: t.number,
    playerId: UUID,
    planetId: UUID,
    point: PointC,
    temperature: t.Int,
});

export type PlayerJoinedEventT = t.TypeOf<typeof PlayerJoinedEventC>;

export class PlayerJoinedEvent extends Event<PlayerJoinedEventT> {}
