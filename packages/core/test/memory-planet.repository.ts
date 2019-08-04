import { IEvent } from '@nestjs/cqrs';

import { UUID } from 'io-ts-types/lib/UUID';

import { PlanetRepository } from '../src/planet/planet.repository';
import { PlanetModel } from '../src/planet/models/planet.model';
import { PointT, distance } from '../src/shared/Point';
import { PlayerJoinedEvent } from '../src/planet/events';
import { isA } from '../src/utils';

export class MemoryPlanetRepository extends PlanetRepository {
    public readonly events: IEvent[];

    constructor() {
        super();
        this.events = [];
    }

    public async getById(id: UUID): Promise<PlanetModel | undefined> {
        const events = this.events.filter(
            (event: any) => event.payload.planetId === id,
        );
        return this.fromEvents(events as any, Date.now());
    }

    public async getByPoint(point: PointT): Promise<PlanetModel | undefined> {
        const init = this.events
            .filter(isA(PlayerJoinedEvent))
            .find(event => distance(event.payload.point)(point) === 0);
        // TODO relocations!
        return init ? this.getById(init.payload.planetId) : undefined;
    }

    public async getByPlayerId(playerId: UUID): Promise<PlanetModel[]> {
        const inits = this.events
            .filter(isA(PlayerJoinedEvent))
            .filter(event => event.payload.playerId === playerId);
        const planets = await Promise.all(
            inits.map(event => this.getById(event.payload.planetId)),
        );
        return planets.filter(isA(PlanetModel));
    }
}
