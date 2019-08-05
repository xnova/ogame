import { OGameException } from './ogame.exception';

export class PlanetNotFoundException extends OGameException {
    constructor() {
        super('Planet not found exception!');
    }
}
