import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { BuildFinishCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(BuildFinishCommand)
export class BuildFinishHandler implements ICommandHandler<BuildFinishCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: BuildFinishCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.buildFinish(payload.ms);
        planet.commit();
    }
}
