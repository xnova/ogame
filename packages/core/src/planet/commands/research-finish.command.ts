import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const ResearchFinishCommandC = t.type({
    ms: t.number,
    planetId: UUID,
});

export type ResearchFinishCommandT = t.TypeOf<typeof ResearchFinishCommandC>;

export class ResearchFinishCommand extends Command<ResearchFinishCommandT> {}
