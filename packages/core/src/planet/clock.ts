import { Injectable } from '@nestjs/common';

// TODO move to shared or packages/common
@Injectable()
export class Clock {
    public now(): number {
        return Date.now();
    }
}
