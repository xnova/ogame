import { OGameException } from './ogame.exception';

export class PlanetNotEnoughFieldsException extends OGameException {
    constructor() {
        super('This planet does not have enough available fields!');
    }
}
