/**
 * @file queue's set
 * @author houyu(785798835@qq.com)
 */
import Queue from './queue';

export default class QueueSet {

    constructor() {
        this.queueSet = {};
    }

    get(namespace) {
        if (!this.queueSet[namespace]) {
            this.queueSet[namespace] = new Queue();
        }
        return this.queueSet[namespace];
    }

    pushTo(namespace, message) {
        this.get(namespace).push(message);
    }

    has(namespace) {
        return !!this.queueSet[namespace];
    }

    del(namespace, funcQuote) {
        if (namespace === '*') {
            Object.keys(this.queueSet).forEach(queueName => {
                const queue = this.queueSet[queueName].queue;
                queue && queue.del(funcQuote);
            });
        }
        else {
            this.queueSet[namespace].del(funcQuote);
        }
    }
}
