import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { BuildCancelCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
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
            throw new PlanetNotFoundException();
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.buildCancel();
        planet.commit();
    }
}
