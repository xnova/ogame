import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';
import { PointC } from '../../shared/Point';

export const PlayerJoinCommandC = t.type({
    ms: t.number,
    playerId: UUID,
    planetId: UUID,
    point: PointC,
    temperature: t.Int,
});

export type PlayerJoinCommandT = t.TypeOf<typeof PlayerJoinCommandC>;

export class PlayerJoinCommand extends Command<PlayerJoinCommandT> {}
