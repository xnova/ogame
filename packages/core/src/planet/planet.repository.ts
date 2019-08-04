import { Injectable } from '@nestjs/common';

import { UUID } from 'io-ts-types/lib/UUID';

import { PointT } from '../shared/Point';
import { isA } from '../utils';

import { PlanetModel } from './models/planet.model';
import { BuildStartedEvent, PlayerJoinedEvent } from './events';
import { MetalMine, Building } from './models/buildings';

type PlanetEvent = PlayerJoinedEvent | BuildStartedEvent;

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
        const firstEvent = events[0];
        if (!isA(PlayerJoinedEvent)(firstEvent)) {
            return undefined;
        }
        const initEvent: PlayerJoinedEvent = firstEvent;
        const planet = new PlanetModel(initEvent.payload.planetId);
        lastUpdate = initEvent.payload.ms;

        // process all events
        for (const event of events) {
            // produce
            const then: number = event.payload.ms;
            planet.produce(then - lastUpdate);
            lastUpdate = then;

            // process event
            // TODO optimize, nested elseif isA
            if (isA(PlayerJoinedEvent)(event)) {
                planet.temperature = event.payload.temperature;
            } else if (isA(BuildStartedEvent)(event)) {
                planet.construction = {
                    buildingId: event.payload.buildingId,
                    level: event.payload.level,
                    start: event.payload.start,
                    end: event.payload.end,
                };
                // TODO get building per buildingId
                const building: Building = new MetalMine(event.payload.level);
                planet.withdraw(building.getCost());
            }
        }

        // produce resources until NOW
        planet.produce(now - lastUpdate);
        lastUpdate = now;

        return planet;
    }
}
