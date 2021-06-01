class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
        this.state = 'fulfilled';
      }
    };
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
        this.state = 'rejected';
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    const returnPromise = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // returnPromise在这里使用时尚未定义，因此需要用setTimeout包装，使它进入下一个事件循环
        setTimeout(() => {
          const x = onFulfilled(this.value);
          resolvePromise(returnPromise, x, resolve, reject);
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          const x = onRejected(this.reason);
          resolvePromise(returnPromise, x, resolve, reject);
        }, 0);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.value);
            resolvePromise(returnPromise, x, resolve, reject);
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason);
            resolvePromise(returnPromise, x, resolve, reject);
          }, 0);
        });
      }
    });
    return returnPromise;
  }
}

const resolvePromise = (returnPromise, x, resolve, reject) => {
  // 如果returnPromise 和 x相等，则是循环引用，报错
  if (returnPromise === x) {
    return reject(new TypeError('循环引用'));
  }
  // 判断x是基本数据类型还是Promise实例，如果是基本数据类型如string，number，则直接resolve出去就好了
  if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    const then = x.then;
    if (typeof then === 'function') { // 此时我们就认为x是一个Promise实例
      // 之所以用call，是保证this为x本身，不会被上下文的this所取代
      then.call(x, res => {
        // 不考虑递归解析的话就resolve结果即可
        // resolve(res);
        // 考虑递归解析
        resolvePromise(returnPromise, x, resolve, reject);
      }, err => {
        reject(err);
      });
    }
  } else {
    // 返回不是Promise实例，直接resolve出去
    resolve(x);
  }
}
module.exports = Promise;