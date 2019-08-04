export type Type<T> = new (...args: any[]) => T;

export const isA = <T>(type: Type<T>) => (value): value is T =>
    value instanceof type;
