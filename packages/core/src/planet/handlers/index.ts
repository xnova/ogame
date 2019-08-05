import { BuildCancelHandler } from './build-cancel.handler';
import { BuildStartHandler } from './build-start.handler';
import { PlayerJoinHandler } from './player-join.handler';

export const CommandHandlers = [
    BuildCancelHandler,
    BuildStartHandler,
    PlayerJoinHandler,
];
