import { OGameException } from './ogame.exception';

export class PlanetNotFinishedBuildingException extends OGameException {
    constructor() {
        super('This planet has not finished building!');
    }
}
