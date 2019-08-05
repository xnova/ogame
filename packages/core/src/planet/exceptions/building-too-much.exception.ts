import { OGameException } from './ogame.exception';

export class BuildingTooMuchException extends OGameException {
    constructor() {
        super('Can only improve level one by one!');
    }
}
