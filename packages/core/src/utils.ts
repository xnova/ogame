export type Type<T> = new (...args: any[]) => T;

export const isA = <T>(type: Type<T>) => (value): value is T =>
    value instanceof type;

export const add = (a: number, b: number) => a + b;

export const sum = (xs: number[]): number => xs.reduce(add, 0);

// TODO this belongs to utils? common?

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 365;

export const MS = 1;
export const SECOND = MS_IN_SECOND * MS;
export const MINUTE = SECONDS_IN_MINUTE * SECOND;
export const HOUR = MINUTES_IN_HOUR * MINUTE;
export const DAY = HOURS_IN_DAY * HOUR;
export const WEEK = DAYS_IN_WEEK * DAY;
export const MONTH = DAYS_IN_MONTH * DAY;
export const YEAR = DAYS_IN_YEAR * DAY;
