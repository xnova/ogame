import { OGameException } from './ogame.exception';

export class PlanetNotEnoughResourcesException extends OGameException {
    constructor() {
        super('This planet does not have enough resources!');
    }
}
