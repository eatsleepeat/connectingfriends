import {topics, API_URL} from "./constants";

export class Person {
    name: string;
    currentTopic: string = "";
    currentA: string = "";
    currentB: string = "";
    interests: {[key: string]: number} = {};
    constructor(name: string = "", ) {
        this.name = name;
    }
    generateComparison(): void {
        if (this.currentTopic === "") {
            this.currentA = topics[Math.floor(Math.random() * topics.length)];
        } else {
            this.currentA = this.currentTopic;
        }
        do {
            this.currentB = topics[Math.floor(Math.random() * topics.length)];
        } while (this.currentA === this.currentB);
    }
    choose(topic: string): void {
        if (!(topic in this.interests)) {
            this.interests[topic] = 1;
        } else {
            this.interests[topic]++;
        }
        this.currentTopic = topic;
    }
    submitToAPI() {
        fetch(`${API_URL}`)
    }
}