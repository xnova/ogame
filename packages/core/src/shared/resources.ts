import * as t from 'io-ts';

import { add } from '../utils';

export const ResourcesC = t.type({
    metal: t.number,
    crystal: t.number,
    deuterium: t.number,
    energy: t.number,
});

export type ResourcesT = t.TypeOf<typeof ResourcesC>;

const ZERO: ResourcesT = {
    metal: 0,
    crystal: 0,
    deuterium: 0,
    energy: 0,
};

const ONE: ResourcesT = {
    metal: 1,
    crystal: 1,
    deuterium: 1,
    energy: 1,
};

export type Resource = keyof ResourcesT;

const RESOURCE_KEYS: Resource[] = ['metal', 'crystal', 'deuterium', 'energy'];

export class Resources implements ResourcesT {
    public readonly metal: number;
    public readonly crystal: number;
    public readonly deuterium: number;
    public readonly energy: number;

    constructor({ metal, crystal, deuterium, energy }: ResourcesT) {
        this.metal = metal;
        this.crystal = crystal;
        this.deuterium = deuterium;
        this.energy = energy;
    }

    public static Zero(): Resources {
        return new Resources(ZERO);
    }

    public static One(): Resources {
        return new Resources(ONE);
    }

    public static Partial(partial: Partial<ResourcesT>): Resources {
        return new Resources({
            ...ZERO,
            ...partial,
        });
    }

    /**
     * Applies reduce element-wise to each resource
     */
    public static reduce(
        xs: ResourcesT[],
        cb: (previousValue: number, currentValue: number) => number,
        initalValue: number = 0,
    ): Resources {
        return Resources.Zero().map((_, resource) =>
            xs.map(x => x[resource]).reduce(cb, initalValue),
        );
    }

    public static sum(xs: ResourcesT[]): Resources {
        return Resources.reduce(xs, add);
    }

    public values(): number[] {
        const values: number[] = [];
        for (const resource of RESOURCE_KEYS) {
            values.push(this[resource]);
        }
        return values;
    }

    public map(f: (x: number, key: keyof ResourcesT) => number): Resources {
        const newResources: ResourcesT = { ...ZERO };
        for (const resource of RESOURCE_KEYS) {
            newResources[resource] = f(this[resource], resource);
        }
        return new Resources(newResources);
    }

    public multiply(k: number): Resources {
        return this.map(x => k * x);
    }

    public dotMultiply(other: ResourcesT): Resources {
        return this.map((amount, resource) => amount * other[resource]);
    }

    public add(other: ResourcesT): Resources {
        return this.map((amount, resource) => amount + other[resource]);
    }

    public subtract(other: ResourcesT): Resources {
        return this.map((amount, resource) => amount - other[resource]);
    }

    public includes(other: Resources): boolean {
        const diff = this.subtract(other).values();
        return diff.every(x => x >= 0);
    }

    public equals(other: ResourcesT): boolean {
        for (const resource of RESOURCE_KEYS) {
            if (this[resource] !== other[resource]) {
                return false;
            }
        }
        return true;
    }

    public toString(): string {
        const representation: Partial<ResourcesT> = {};
        for (const resource of RESOURCE_KEYS) {
            if (this[resource] !== 0) {
                representation[resource] = this[resource];
            }
        }
        return JSON.stringify(representation);
    }
}
