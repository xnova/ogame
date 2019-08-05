import { OGameException } from './ogame.exception';

export class BuildingNotFoundException extends OGameException {
    constructor() {
        super('Building not found exception!');
    }
}
