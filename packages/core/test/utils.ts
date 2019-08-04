export const niceError = async <T>(promise: Promise<T>): Promise<T> => {
    try {
        return await promise;
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.trace(err);
        const potentialError = new Error();
        potentialError.message =
            err instanceof Error ? err.message : String(err);
        throw potentialError;
    }
};
