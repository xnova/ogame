export abstract class Event<Payload> {
    constructor(public readonly payload: Payload) {}
}
