import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const BuildFinishCommandC = t.type({
    ms: t.number,
    planetId: UUID,
});

export type BuildFinishCommandT = t.TypeOf<typeof BuildFinishCommandC>;

export class BuildFinishCommand extends Command<BuildFinishCommandT> {}
