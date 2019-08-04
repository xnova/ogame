import { Injectable } from '@nestjs/common';

import { UUID } from 'io-ts-types/lib/UUID';

import { PointT } from '../shared/Point';

import { PlayerJoinedEvent } from './events/player-joined.event';
import { PlanetModel } from './models/planet.model';

type PlanetEvent = PlayerJoinedEvent;

@Injectable()
export class PlanetRepository {
    public async createById(id: UUID): Promise<PlanetModel> {
        // TODO
        return new PlanetModel(id);
    }

    public async getById(id: UUID): Promise<PlanetModel | undefined> {
        // TODO better error
        throw new Error(
            'Instantiating Abstract class, please override it in your module.',
        );
    }

    public async getByPoint(point: PointT): Promise<PlanetModel | undefined> {
        // TODO better error
        throw new Error(
            'Instantiating Abstract class, please override it in your module.',
        );
    }

    public async getByPlayerId(playerId: UUID): Promise<PlanetModel[]> {
        // TODO better error
        throw new Error(
            'Instantiating Abstract class, please override it in your module.',
        );
    }

    public fromEvents(
        events: PlanetEvent[],
        now: number,
    ): PlanetModel | undefined {
        if (events.length === 0) return undefined;

        let lastUpdate: number;
        const initEvent: PlayerJoinedEvent = events[0];
        const planet = new PlanetModel(initEvent.payload.planetId);
        lastUpdate = initEvent.payload.ms;

        // process all events
        for (const event of events) {
            // produce
            const then: number = event.payload.ms;
            planet.produce(then - lastUpdate);
            lastUpdate = then;

            // TODO process event
            planet.temperature = event.payload.temperature;
        }

        // produce resources until NOW
        planet.produce(now - lastUpdate);
        lastUpdate = now;

        return planet;
    }
}
