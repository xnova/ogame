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

const affine = (options: { slope: number; n: number }) => (x: number): number =>
    options.slope * x + options.n;

const distanceX = affine({ slope: 20000, n: 0 }); // linear
const distanceY = affine({ slope: 95, n: 2700 });
const distanceZ = affine({ slope: 5, n: 1000 });
const distanceT = affine({ slope: 0, n: 5 }); // constant
/**
 * http://ogame.wikia.com/wiki/Distance
 * @param {*} p
 * @param {*} q
 */
export const distance = (p: PointT) => (q: PointT): number => {
    const diff = subtract(p)(q);
    if (diff.x !== 0) {
        return distanceX(Math.abs(diff.x));
    } else if (diff.y !== 0) {
        return distanceY(Math.abs(diff.y));
    } else if (diff.z !== 0) {
        return distanceZ(Math.abs(diff.z));
    } else if (diff.t !== 0) {
        return distanceT(Math.abs(diff.t));
    }

    return 0;
};
