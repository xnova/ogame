import * as t from 'io-ts';

import { BuildingNotFoundException } from '../exceptions';
import * as buildings from '../models/buildings';

// https://stackoverflow.com/a/35787628
export function createBuilding(
    className: string,
    level: t.Int,
): buildings.Building {
    const Type = (buildings as any)[className];
    if (!Type) {
        throw new BuildingNotFoundException();
    }
    return new Type(level);
}
