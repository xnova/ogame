import { UnitNotFoundException } from '../exceptions';

import * as defenses from './defenses';
import { Defense } from './defenses/Defense';
import { ShipyardUnit } from './defenses/ShipyardUnit';
import * as ships from './ships';
import { Ship } from './ships/Ship';

const units = { ...ships, ...defenses };

// https://stackoverflow.com/a/35787628
export function createUnit(className: string): ShipyardUnit {
    const Type = (units as any)[className];
    if (!Type) {
        throw new UnitNotFoundException();
    }
    return new Type();
}

// https://stackoverflow.com/a/35787628
export function createShip(className: string): Ship {
    const Type = (ships as any)[className];
    if (!Type) {
        throw new UnitNotFoundException();
    }
    return new Type();
}

// https://stackoverflow.com/a/35787628
export function createDefense(className: string): Defense {
    const Type = (defenses as any)[className];
    if (!Type) {
        throw new UnitNotFoundException();
    }
    return new Type();
}
