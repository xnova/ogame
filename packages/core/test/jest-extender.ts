import { Resources } from '../src/shared/resources';

expect.extend({
    toBeApprox(received: number, argument: number) {
        const epsilon = 0.01;
        const pass = Math.abs(argument - received) < epsilon;
        const message = () =>
            pass
                ? `expected ${received} not to be ${argument}±${epsilon}`
                : `expected ${received} to be ${argument}±${epsilon}`;
        return { pass, message };
    },

    toBeResources(received: Resources, argument: Resources) {
        const pass = argument.equals(received);
        const message = () =>
            pass
                ? `expected ${received} not to be equals to ${argument}`
                : `expected ${received} to be equals to ${argument}`;
        return { pass, message };
    },
});
