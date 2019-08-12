import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const ResearchStartCommandC = t.type({
    ms: t.number,
    planetId: UUID,
    techId: t.string,
    level: t.Int,
});

export type ResearchStartCommandT = t.TypeOf<typeof ResearchStartCommandC>;

export class ResearchStartCommand extends Command<ResearchStartCommandT> {}
