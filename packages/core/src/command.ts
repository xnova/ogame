export abstract class Command<Payload> {
    // TODO DeepReadonly
    constructor(public readonly payload: Payload) {}
}
