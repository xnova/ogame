import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ResearchFinishCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(ResearchFinishCommand)
export class ResearchFinishHandler
    implements ICommandHandler<ResearchFinishCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: ResearchFinishCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.researchFinish(payload.ms);
        planet.commit();
    }
}
