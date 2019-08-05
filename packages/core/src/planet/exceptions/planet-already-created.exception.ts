import { OGameException } from './ogame.exception';

export class PlanetAlreadyCreatedException extends OGameException {
    constructor() {
        super('This planet is already created!');
    }
}
