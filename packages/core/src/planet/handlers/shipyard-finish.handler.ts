import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ShipyardFinishCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(ShipyardFinishCommand)
export class ShipyardFinishHandler
    implements ICommandHandler<ShipyardFinishCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: ShipyardFinishCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.shipyardFinish(payload.ms);
        planet.commit();
    }
}
