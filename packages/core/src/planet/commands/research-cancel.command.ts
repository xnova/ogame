import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const ResearchCancelCommandC = t.type({
    ms: t.number,
    planetId: UUID,
});

export type ResearchCancelCommandT = t.TypeOf<typeof ResearchCancelCommandC>;

export class ResearchCancelCommand extends Command<ResearchCancelCommandT> {}
