import { BuildCancelHandler } from './build-cancel.handler';
import { BuildFinishHandler } from './build-finish.handler';
import { BuildStartHandler } from './build-start.handler';
import { PlayerJoinHandler } from './player-join.handler';
import { ResearchCancelHandler } from './research-cancel.handler';
import { ResearchStartHandler } from './research-start.handler';

export const CommandHandlers = [
    BuildCancelHandler,
    BuildFinishHandler,
    BuildStartHandler,
    PlayerJoinHandler,
    ResearchCancelHandler,
    ResearchStartHandler,
];
