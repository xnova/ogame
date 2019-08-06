import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { Clock } from './clock';
import { CommandHandlers } from './handlers';

@Module({
    imports: [CqrsModule],
    providers: [Clock, ...CommandHandlers],
    exports: [...CommandHandlers],
})
export class PlanetModule {}
