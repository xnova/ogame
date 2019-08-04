import { AggregateRoot } from '@nestjs/cqrs';

import * as t from 'io-ts';
import { UUID } from 'io-ts-types/lib/UUID';

import { Resources, ResourcesC } from '../../shared/resources';
import { PlayerJoinCommandT } from '../commands';
import { PlayerJoinedEvent } from '../events';

import { CrystalMine, DeuteriumSynthesizer, MetalMine } from './buildings';
import { Technology } from './technologies';

export const PlanetC = t.type({
    id: UUID,
    name: t.string,
    diameter: t.Int,
    temperature: t.Int,
    resources: ResourcesC,
});

export type PlanetT = t.TypeOf<typeof PlanetC>;

const BASIC_INCOME: Resources = Resources.Partial({ metal: 45, crystal: 15 });

export type Type<T> = new (...args: any[]) => T;

export class PlanetModel extends AggregateRoot implements PlanetT {
    public name: string;
    public diameter: t.Int;
    public temperature: t.Int;
    public resources: Resources;

    constructor(public readonly id: UUID) {
        super();
        this.name = '';
        // TODO constant? config?
        this.diameter = 12800 as any;
        // TODO config? Universe?
        this.resources = Resources.Partial({ metal: 500, crystal: 500 });
    }

    public get<T = any>(type: Type<T>): T {
        if (Technology.isPrototypeOf(type)) {
            return new type(0);
        }
        return new type();
    }

    /**
     * Resources produced in this planet per hour.
     */
    public getProduction(): Resources {
        const metalMine = this.get(MetalMine);
        const crystalMine = this.get(CrystalMine);
        const deuteriumMine = this.get(DeuteriumSynthesizer);
        return BASIC_INCOME;
    }

    public produce(ms: number): void {
        // TODO speed production
        const hours: number = ms / 1000 / 3600;
        const production = this.getProduction();
        this.resources = this.resources.map(
            (amount, resource) => amount + hours * production[resource],
        );
        // TODO cap by storage
    }

    public join(command: PlayerJoinCommandT) {
        // TODO logic...
        this.apply(new PlayerJoinedEvent(command));
    }
}
