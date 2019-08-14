import { OGameException } from './ogame.exception';

export class PlanetNotFinishedException extends OGameException {
    constructor(action: string = 'building') {
        super(`This planet has not finished ${action}!`);
    }
}
