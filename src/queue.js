/**
 * @file queue's oprator
 * @author houyu(houyu01@baidu.com)
 */
export default class Queue {

    constructor() {
        this.queue = [];
    }

    push(message) {
        this.queue.push(message);
    }

    getQueue() {
        return this.queue;
    }

    pop(delta = 1) {
        let resQueue = [];
        while (delta--) {
            resQueue.push(this.queue.pop());
        }
        return resQueue;
    }

    del(funcQuote) {
        this.queue = this.queue.filter(func => func !== funcQuote);
    }
}
