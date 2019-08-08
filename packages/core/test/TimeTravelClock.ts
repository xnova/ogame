import { Clock } from '../src/planet/clock';

export class TimeTravelClock extends Clock {
    private offset: number;
    private start: number;

    constructor() {
        super();
        this.offset = 0;
        this.start = Date.now();
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
        return this.start + this.offset;
    }
}
