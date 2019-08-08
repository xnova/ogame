// https://github.com/testing-library/react-testing-library/issues/36#issuecomment-440442300

import { Resources } from '../src/shared/resources';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeResources(value: Resources): CustomMatcherResult;
        }
    }
}
