import { OGameException } from './ogame.exception';

export class PlanetNotResearchingException extends OGameException {
    constructor() {
        super('This planet is not researching anything!');
    }
}
