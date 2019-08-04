import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { PlayerJoinCommand } from '../commands';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(PlayerJoinCommand)
export class PlayerJoinHandler implements ICommandHandler<PlayerJoinCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: PlayerJoinCommand) {
        const { payload } = command;
        const sameId = await this.repository.getById(payload.planetId);
        if (sameId) {
            // TODO better errors
            throw new Error('planet already occupied');
        }
        const samePlace = await this.repository.getByPoint(payload.point);
        if (samePlace) {
            // TODO better errors
            throw new Error('place already occupied');
        }
        const player = await this.repository.getByPlayerId(payload.playerId);
        if (player.length > 0) {
            // TODO better errors
            throw new Error('place already occupied');
        }

        const planet = this.publisher.mergeObjectContext(
            await this.repository.createById(payload.planetId),
        );
        planet.join(payload);
        planet.commit();
    }
}
