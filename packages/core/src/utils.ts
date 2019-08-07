export type Type<T> = new (...args: any[]) => T;

export const isA = <T>(type: Type<T>) => (value): value is T =>
    value instanceof type;

export const add = (a: number, b: number) => a + b;

export const sum = (xs: number[]): number => xs.reduce(add, 0);
