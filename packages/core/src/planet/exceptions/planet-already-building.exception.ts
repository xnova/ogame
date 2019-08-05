import { OGameException } from './ogame.exception';

export class PlanetAlreadyBuildingException extends OGameException {
    constructor() {
        super('This planet is already Building!');
    }
}
