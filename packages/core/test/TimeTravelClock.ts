import { Clock } from '../src/planet/clock';

export class TimeTravelClock extends Clock {
    private offset: number;

    constructor() {
        super();
        this.offset = 0;
    }

    public getOffset() {
        return this.offset;
    }

    public setTime(ms: number) {
        this.offset = ms - super.now();
    }

    public fastForward(ms: number) {
        this.offset = this.offset + ms;
    }

    public now(): number {
        return super.now() + this.offset;
    }
}
