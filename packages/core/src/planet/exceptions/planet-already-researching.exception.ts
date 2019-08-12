import { OGameException } from './ogame.exception';

export class PlanetAlreadyResearchingException extends OGameException {
    constructor() {
        super('This planet is already Researching!');
    }
}
