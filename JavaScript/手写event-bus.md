## 手写`Event Bus`

```js
class EventEmitter {
    constructor() {
        // handler用于存储事件和回调函数之间的对应关系
        this.handler = {};
    }

    // 添加事件监听,它接受目标事件名和回调函数作为参数
    addEvent(eventName, callback) {
        // 检查目标事件名有没有对应的监听函数队列
        if (!this.handler[eventName]) {
            // 如果没有,就初始化一个监听函数队列
            this.handler[eventName] = [];
        }
        // 把新的回调函数推入目标事件的监听函数队列中去
        this.handler[eventName].push(callback);
    }

    // 注册单次事件监听器
    onceAddEvent(eventName, callback) {
        // 对回调函数进行包装,使其执行完毕自动被移除
        const fn = (...args) => {
            callback(...args);
            this.removeEvent(eventName, fn);
        }
        this.addEvent(eventName, fn);
    }

    // 移除某个事件监听函数队列中的指定回调函数
    removeEvent(eventName, callback) {
        if (this.handler[eventName]) {
            const index = this.handler[eventName].indexOf(callback);
            if (index !== -1) {
                this.handler[eventName].splice(index, 1);
            }
        }
    }

    // emit用于触发目标事件,它接受事件名和监听函数入参为参数
    emitEvent(eventName, ...args) {
        // 检查目标事件是否有监听函数队列
        if (this.handler[eventName]) {
            // 如果有,逐个调用队列中的回调函数
            this.handler[eventName].forEach(callback => {
                callback(...args);
            });
        }
    }
}
```


