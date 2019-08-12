import { OGameException } from './ogame.exception';

export class TooMuchLevelException extends OGameException {
    constructor() {
        super('Can only improve level one by one!');
    }
}
