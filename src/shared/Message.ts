export class Message {
    from: string;
    to: string;
    body: string;
    constructor(from, to, body) {
        this.from = from;
        this.to = to;
        this.body = body;
    }
}