import { Clock } from '../src/planet/clock';
import { DAY, HOUR, MONTH, WEEK, YEAR } from '../src/utils';

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

    public fastForwardOneHour() {
        this.fastForward(HOUR);
    }

    public fastForwardOneDay() {
        this.fastForward(DAY);
    }

    public fastForwardOneWeek() {
        this.fastForward(WEEK);
    }

    public fastForwardOneMonth() {
        this.fastForward(MONTH);
    }

    public fastForwardOneYear() {
        this.fastForward(YEAR);
    }

    public now(): number {
        return this.start + this.offset;
    }
}
