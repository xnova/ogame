import { OGameException } from './ogame.exception';

export class RequirementsAreNotMeetException extends OGameException {
    constructor() {
        super('Requirements are not meet!');
    }
}
