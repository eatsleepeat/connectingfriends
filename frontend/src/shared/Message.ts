export class Message {
    from: string;
    to: string;
    body: string;
    constructor(from:string, to:string, body:string) {
        this.from = from;
        this.to = to;
        this.body = body;
    }
}