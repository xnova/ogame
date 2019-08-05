import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { PlayerJoinCommand } from '../commands';
import {
    PlanetAlreadyCreatedException,
    PlayerAlreadyJoinedException,
    PointAlreadyOccupied,
} from '../exceptions';
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
            throw new PlanetAlreadyCreatedException();
        }
        const samePlace = await this.repository.getByPoint(payload.point);
        if (samePlace) {
            throw new PointAlreadyOccupied();
        }
        const planets = await this.repository.getByPlayerId(payload.playerId);
        if (planets.length > 0) {
            throw new PlayerAlreadyJoinedException();
        }

        const planet = this.publisher.mergeObjectContext(
            await this.repository.createById(payload.planetId),
        );
        planet.join(payload);
        planet.commit();
    }
}
