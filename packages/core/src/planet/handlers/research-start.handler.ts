import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ResearchStartCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { createTechnology } from '../models/createTechnology';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(ResearchStartCommand)
export class ResearchStartHandler
    implements ICommandHandler<ResearchStartCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: ResearchStartCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        // parse techId
        const technology = createTechnology(payload.techId, payload.level);

        const planet = this.publisher.mergeObjectContext(found);
        planet.researchStart(technology, payload.ms);
        planet.commit();
    }
}
