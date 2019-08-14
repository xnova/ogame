import { BuildCancelHandler } from './build-cancel.handler';
import { BuildFinishHandler } from './build-finish.handler';
import { BuildStartHandler } from './build-start.handler';
import { PlayerJoinHandler } from './player-join.handler';
import { ResearchCancelHandler } from './research-cancel.handler';
import { ResearchFinishHandler } from './research-finish.handler';
import { ResearchStartHandler } from './research-start.handler';
import { ShipyardFinishHandler } from './shipyard-finish.handler';
import { ShipyardStartHandler } from './shipyard-start.handler';

export const CommandHandlers = [
    BuildCancelHandler,
    BuildFinishHandler,
    BuildStartHandler,
    PlayerJoinHandler,
    ResearchCancelHandler,
    ResearchFinishHandler,
    ResearchStartHandler,
    ShipyardFinishHandler,
    ShipyardStartHandler,
];
