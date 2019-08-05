import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { BuildCancelCommand } from '../commands';
import { Building, MetalMine } from '../models/buildings';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(BuildCancelCommand)
export class BuildCancelHandler implements ICommandHandler<BuildCancelCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: BuildCancelCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            // TODO better errors
            throw new Error('planet not found');
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.buildCancel();
        planet.commit();
    }
}
