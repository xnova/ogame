import * as t from 'io-ts';

import * as buildings from '../models/buildings';

// https://stackoverflow.com/a/35787628
export function createBuilding(
    className: string,
    level: t.Int,
): buildings.Building {
    return new (buildings as any)[className](level);
}
