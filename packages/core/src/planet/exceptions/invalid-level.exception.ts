import { OGameException } from './ogame.exception';

export class InvalidLevelException extends OGameException {
    constructor() {
        super('Invalid level exception. A level must be a natural number.');
    }
}
