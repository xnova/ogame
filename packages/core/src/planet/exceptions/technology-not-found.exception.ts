import { OGameException } from './ogame.exception';

export class TechnologyNotFoundException extends OGameException {
    constructor() {
        super('Technology not found exception!');
    }
}
