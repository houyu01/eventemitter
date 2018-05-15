/**
 * @file base listen/fire lib，u can use it as a normal observer in your code
 * @author houyu(785798835@qq.com)
 */
import QueueSet from './queueSet';

export default class Communicator {
    constructor() {
        this.handlerQueueSet = new QueueSet();
        this.messageQueueSet = new QueueSet();
    }

    static merge(...communicators) {
        const mergedCommunicator = new Communicator();
        [...communicators].forEach(communicator => {
            communicator.onMessage('*', e => mergedCommunicator.fireMessage(e));
        });
        return mergedCommunicator;
    }

    fireMessage(message) {
        if (message && message.type && this.handlerQueueSet.get(message.type)) {
            this.messageQueueSet.pushTo(message.type, message);
            this.handlerQueueSet.get(message.type).getQueue()
            .forEach(item => {
                this.handlerWrapper(item.handler, item.once, message);
            });
            this.handlerQueueSet.get('*').getQueue()
            .forEach(item => {
                this.handlerWrapper(item.handler, item.once, message);
            });
        }
        return this;
    }

    onMessage(type, handler, options = {}) {
        this.handlerQueueSet.pushTo(type, {
            handler,
            once: options.once
        });
        if (options.listenPreviousEvent === true && this.messageQueueSet.has(type)) {
            this.handlerWrapper(handler, options.once, this.messageQueueSet.get(type).getQueue());
        }
        return this;
    }

    handlerWrapper(handler, once, ...args) {
        if (!handler) {
            return false;
        }
        handler.call(window, ...args);
        // 如果设定，用完即删
        if (once) {
            this.handlerQueueSet.del('*', handler);
        }
        return true;
    }
};

export {QueueSet};
