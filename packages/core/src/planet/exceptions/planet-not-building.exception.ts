import { OGameException } from './ogame.exception';

export class PlanetNotBuildingException extends OGameException {
    constructor() {
        super('This planet is not building anything!');
    }
}
