import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const BuildCancelCommandC = t.type({
    ms: t.number,
    planetId: UUID,
});

export type BuildCancelCommandT = t.TypeOf<typeof BuildCancelCommandC>;

export class BuildCancelCommand extends Command<BuildCancelCommandT> {}
