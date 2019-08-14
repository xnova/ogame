import { OGameException } from './ogame.exception';

export class PlanetAlreadyBusyException extends OGameException {
    constructor(action: string = 'building') {
        super(`This planet is already ${action}!`);
    }
}
