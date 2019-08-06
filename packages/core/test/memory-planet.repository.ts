import { IEvent } from '@nestjs/cqrs';

import { UUID } from 'io-ts-types/lib/UUID';

import { Clock } from '../src/planet/clock';
import { PlayerJoinedEvent } from '../src/planet/events';
import { PlanetModel } from '../src/planet/models/planet.model';
import { PlanetRepository } from '../src/planet/planet.repository';
import { distance, PointT } from '../src/shared/Point';
import { isA } from '../src/utils';

export class MemoryPlanetRepository extends PlanetRepository {
    public readonly events: IEvent[];

    constructor(private readonly clock: Clock) {
        super();
        this.events = [];
    }

    public async getById(id: UUID): Promise<PlanetModel | undefined> {
        const events = this.events.filter(
            (event: any) => event.payload.planetId === id,
        );
        return this.fromEvents(events as any, this.clock.now());
    }

    public async getByPoint(point: PointT): Promise<PlanetModel | undefined> {
        const init = this.events
            .filter(isA(PlayerJoinedEvent))
            .find(event => distance(event.payload.point)(point) === 0);
        // TODO relocations!
        return init ? this.getById(init.payload.planetId) : undefined;
    }

    public async getByPlayerId(playerId: UUID): Promise<PlanetModel[]> {
        const joinedEvents = this.events
            .filter(isA(PlayerJoinedEvent))
            .filter(event => event.payload.playerId === playerId);
        const planets = await Promise.all(
            joinedEvents.map(event => this.getById(event.payload.planetId)),
        );
        return planets.filter(isA(PlanetModel));
    }
}
