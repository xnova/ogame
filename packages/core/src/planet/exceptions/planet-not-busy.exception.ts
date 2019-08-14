import { OGameException } from './ogame.exception';

export class PlanetNotBusyException extends OGameException {
    constructor(action: string = 'building') {
        super(`This planet is not ${action} anything!`);
    }
}
