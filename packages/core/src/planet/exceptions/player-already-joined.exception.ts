import { OGameException } from './ogame.exception';

export class PlayerAlreadyJoinedException extends OGameException {
    constructor() {
        super('Player already joined exception!');
    }
}
