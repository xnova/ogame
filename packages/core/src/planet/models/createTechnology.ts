import * as t from 'io-ts';

import { TechnologyNotFoundException } from '../exceptions';
import * as technologies from '../models/technologies';

// https://stackoverflow.com/a/35787628
export function createTechnology(
    className: string,
    level: t.Int,
): technologies.Technology {
    const Type = (technologies as any)[className];
    if (!Type) {
        throw new TechnologyNotFoundException();
    }
    return new Type({ level });
}
