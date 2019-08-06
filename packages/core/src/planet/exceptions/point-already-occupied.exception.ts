import { OGameException } from './ogame.exception';

export class PointAlreadyOccupiedException extends OGameException {
    constructor() {
        super('Point already occupied exception!');
    }
}
