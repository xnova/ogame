import { Injectable } from '@nestjs/common';

import { UUID } from 'io-ts-types/lib/UUID';

import { PointT } from '../shared/Point';
import { isA } from '../utils';

import { PlanetModel, PlanetEvent } from './models/planet.model';
import { PlayerJoinedEvent } from './events';

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

        const firstEvent = events[0];
        if (!isA(PlayerJoinedEvent)(firstEvent)) {
            return undefined;
        }
        const planet = new PlanetModel(firstEvent.payload.planetId);
        planet.loadFromHistory(events, now);
        return planet;
    }
}
