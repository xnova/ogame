import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Command } from '../../command';

export const BuildStartCommandC = t.type({
    ms: t.number,
    planetId: UUID,
    buildingId: t.string,
    level: t.Int,
});

export type BuildStartCommandT = t.TypeOf<typeof BuildStartCommandC>;

export class BuildStartCommand extends Command<BuildStartCommandT> {}
