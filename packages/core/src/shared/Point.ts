import * as t from 'io-ts';

export const PointC = t.type({
    x: t.Int,
    y: t.Int,
    z: t.Int,
    t: t.Int,
});
export type PointT = t.TypeOf<typeof PointC>;

type Subtract<T> = (a: T) => (b: T) => T; // TODO externalize?
export const subtract: Subtract<PointT> = a => b => ({
    x: (a.x - b.x) as any,
    y: (a.y - b.y) as any,
    z: (a.z - b.z) as any,
    t: (a.t - b.t) as any,
});

/**
 * http://ogame.wikia.com/wiki/Distance
 * @param {*} p
 * @param {*} q
 */
export const distance = (p: PointT) => (q: PointT): number => {
    const diff = subtract(p)(q);
    if (diff.x !== 0) {
        return 20000 * Math.abs(diff.x);
    } else if (diff.y !== 0) {
        return 2700 + 95 * Math.abs(diff.y);
    } else if (diff.z !== 0) {
        return 1000 + 5 * Math.abs(diff.z);
    } else if (diff.t !== 0) {
        return 5;
    }

    return 0;
};
