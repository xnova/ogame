import { OGameException } from './ogame.exception';

export class PlanetNotFinishedResearchingException extends OGameException {
    constructor() {
        super('This planet has not finished researching!');
    }
}
