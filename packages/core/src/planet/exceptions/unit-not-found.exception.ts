import { OGameException } from './ogame.exception';

export class UnitNotFoundException extends OGameException {
    constructor() {
        super('Unit not found exception!');
    }
}
