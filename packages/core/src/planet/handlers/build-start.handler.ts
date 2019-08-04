import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { BuildStartCommand } from '../commands';
import { Building, MetalMine } from '../models/buildings';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(BuildStartCommand)
export class BuildStartHandler implements ICommandHandler<BuildStartCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: BuildStartCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            // TODO better errors
            throw new Error('planet not found');
        }

        // TODO parse buildingId
        const building: Building = new MetalMine(payload.level);

        const planet = this.publisher.mergeObjectContext(found);
        planet.buildStart(building);
        planet.commit();
    }
}
