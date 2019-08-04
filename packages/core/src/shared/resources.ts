import * as t from 'io-ts';

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

const RESOURCE_KEYS: Array<keyof ResourcesT> = [
    'metal',
    'crystal',
    'deuterium',
    'energy',
];

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

    public static Partial(partial: Partial<Resources>): Resources {
        return new Resources({
            ...ZERO,
            ...partial,
        });
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

    public add(other: Resources): Resources {
        return this.map((amount, resource) => amount + other[resource]);
    }

    public subtract(other: Resources): Resources {
        return this.map((amount, resource) => amount - other[resource]);
    }
}
