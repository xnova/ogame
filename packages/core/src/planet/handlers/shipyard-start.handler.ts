import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ShipyardStartCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { createUnit } from '../models/createUnit';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(ShipyardStartCommand)
export class ShipyardStartHandler
    implements ICommandHandler<ShipyardStartCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: ShipyardStartCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        // parse unitId
        const unit = createUnit(payload.unitId);

        const planet = this.publisher.mergeObjectContext(found);
        planet.shipyardStart(unit, payload.quantity, payload.ms);
        planet.commit();
    }
}
