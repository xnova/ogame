import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ResearchCancelCommand } from '../commands';
import { PlanetNotFoundException } from '../exceptions';
import { PlanetRepository } from '../planet.repository';

@CommandHandler(ResearchCancelCommand)
export class ResearchCancelHandler
    implements ICommandHandler<ResearchCancelCommand> {
    constructor(
        private readonly repository: PlanetRepository,
        public readonly publisher: EventPublisher,
    ) {}

    public async execute(command: ResearchCancelCommand) {
        const { payload } = command;
        const found = await this.repository.getById(payload.planetId);
        if (!found) {
            throw new PlanetNotFoundException();
        }

        const planet = this.publisher.mergeObjectContext(found);
        planet.researchCancel(payload.ms);
        planet.commit();
    }
}
