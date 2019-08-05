import { OGameException } from './ogame.exception';

export class PointAlreadyOccupied extends OGameException {
    constructor() {
        super('Point already occupied exception!');
    }
}
