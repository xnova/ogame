import { Resources } from '../src/shared/resources';

expect.extend({
    toBeResources(received: Resources, argument: Resources) {
        const pass = argument.equals(received);
        const message = () =>
            pass
                ? `expected ${received} not to be equals to ${argument}`
                : `expected ${received} to be equals to ${argument}`;
        return { pass, message };
    },
});
