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

  public map(f: (x: number) => number): Resources {
    const newResources = Resources.Zero();
    for (const [resource, b] of Object.entries(this)) {
      // TODO check it works
      newResources[resource] = f(b);
    }
    return newResources;
  }
}
