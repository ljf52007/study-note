## 手写`Promise`

想了解`Promise`的核心,最好的方法就是自己手写实现它.
手写思路:

1. 在`Promise`内部,是通过三种状态`pending,fulfilled,rejected`来决定执行时机的;
2. `new Promise(executor)`时传入的参数`executor`是一个函数,即`(resolve,reject)=>{}`,该函数中的代码往往是异步代码;
3. `executor`函数的两个参数`resolve,reject`也都各自为一个函数,`resolve`中将状态改为`fulfilled`,`reject`中将状态改为`rejected`;
4. `Promise`实例可以执行`then`方法,它接受两个参数,也都各自为函数,状态为`fulfilled`调用参数一,状态为`rejected`调用参数二;
5. `Promise`实例可以执行`catch`方法;
6. `Promise`链式调用 

现在,我们循序渐进的手写一个`MyPromise`:

​	定义一个`MyPromise`类,在构造函数中定义当前状态`state`为`pending`(初始状态,在遇到`resolve`或`reject`前,一直是`pending`),成功状态的返回值`result`,失败状态的返回值`reason`.

​	当`new MyPromise(executor)`时,会默认调用构造函数,并将参数`executor`传入(这里参数`executor`是一个带有两个参数的函数`(resolve,reject)=>{}`),在构造函数中调用`executor`.

​	`executor`的两个参数也是函数，分别为`resolve`和`reject`。`resolve`中将`state`改为`fulfilled`状态，`reject`将`state`改为`rejected`状态。

​	在`MyPromise`类中定义`then`方法,接收两个参数,分别为`onFulfilled`和`onRejected`.

​	至此代码如下:

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.result = undefined;
    this.reason = undefined;
    const resolve = result => {
      if (this.state === 'pending') {
        this.result = result;
        this.state = 'fulfilled';
      }
    };
    const reject = reason => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.state = 'rejected';
      }
    }
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.result);
    }
    if (this.state === 'rejected') {
      onRejected(this.reason);
    }
  }
}
```

上面的代码看似可行,但一般来说,`executor`函数里面的代码是往往异步代码(如`ajax`请求等)

老套路,用`setTimeout`来模拟发送异步请求:

```js
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 0);
});

p1.then(res => {
    console.log(res); // 没有打印
}, err => {
    console.log(err);
});
p1.then(res => {
  console.log(res+' is easy');
}, err => {
  console.log(err+ 'is bad');
});
```

上面的代码即便我们已经`resolve('success')`,但在`.then`中依旧没有打印结果.

事实上,这就和`JS`的执行机制有关了.(有关`JS`执行机制和`Event Loop`在我其他博客中一些较为详细的理解)

根据`js`的执行机制,同步代码执行至`setTimeout`,会将`setTimeout`放入宏任务的`task queue`,接着执行主线程代码.主线程代码执行完毕后,会先检查是否存在微任务(在这里微任务就是`then`).全部微任务执行完毕后,才会返回宏任务队列执行可以执行的宏任务.

因此,按照上面`MyPromise`类的定义,在`resolve`方法调用前,`then`方法先执行了,此时`state`状态还是`pending`,因此`then`方法没有任何输出.

为此,需要在`then`方法中,新增当`state`状态为`pending`时的处理——

在构造函数中定义两个新的属性`onResolveCallbacks`和`onRejectedCallbacks`,他们是存储回调函数的数组.在执行`then`方法时,如果当前`state`为`pending`,则只将`onFulfilled(this.result)`和`onRejected(this.reason)`作为回调函数分别`push`进这两个数组.而后,在`resolve`和`reject`方法中遍历对应的数组执行里面的回调.

注意,`onResolveCallbacks`需要是一个数组,不能用一个对象或者一个方法,因为我们不一定只在代码中执行一次`then`方法,可能是多次(这里说的多次`.then`不是指`.then`的链式调用,而是指同步并发的`.then`,如下面的示例代码).

实现如下:(细节看注释啦)

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 三种状态,pending等待,fulfilled成功,rejected失败
    this.result = undefined; // 成功返回结果
    this.reason = undefined; // 失败返回结果
    this.onResolvedCallbacks = []; // 成功回调数组
    this.onRejectedCallbacks = []; // 失败回调数组
    const resolve = result => {
      // 加一层 状态为pending的判断,确保只有第一次resolve有效,reject同理
      if (this.state === 'pending') {
        this.result = result;
        // 遍历数组,执行里面的函数
        this.onResolvedCallbacks.forEach(fn => fn());
        // 改变状态为fulfilled
        this.state = 'fulfilled';
      }
    }
    const reject = reason => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
        this.state = 'rejected';
      }
    }
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // 状态为fulfilled时,执行第一个参数函数
    if (this.state === 'fulfilled') {
      onFulfilled(this.result);
    }
    // 状态为rejected时,执行第二个参数函数
    if (this.state === 'rejected') {
      onRejected(this.reason);
    }
    // 状态为pending时,将需要执行的函数保存入回调数组,等待resolve或reject调用时遍历数组执行它们
    if (this.state === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.result);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

const p1 = new MyPromise((resolve, reject) => {
  const timer = setTimeout(() => {
    resolve('success');
    resolve('success2');
    reject('error');
  }, 0);
});
p1.then(res => {
  console.log(res); // success,不会打印success2,因为第一个resolve已经把状态改变为fulfilled
}, err => {
  console.log(err); // 不会打印,因为resolve已经把状态改变为fulfilled
});
p1.then(res => { // 多次.then
  console.log(res, '第二个then'); // success第二个then,会打印,onResolvedCallbacks数组中有两项
}, err => {
  console.log(err, '第二个then'); // 不打印
});
```

如此一来,已经可以实现`Promise`的基本使用了.

继续深究,`Promise`有一个强大又重要的功能不容忽略,那就是`链式调用`.如下示例:

```js
const p1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    resolve('success');
  }, 0);
});
p1.then(res => {
  console.log(res);
  return 'success2'; // 返回的对象需要分别处理
}).then(res => { // 链式调用
  console.log(res); // success2
});
```

链式调用的核心原理是`then`方法返回的对象也是一个`Promise`实例.为此需要对上面的`MyPromise`进行进一步优化:

考虑`onFulfilled`和`onRejected`方法返回的对象有各种情况,但我认为大致可以分为两种:

- 一种是`Promise`实例或`thenable`(有`then`方法的对象)
- 另一种就是其他对象(如上例代码第一个`.then`的`onFulfilled`方法就返回了一个字符串);

如果是`Promise`实例或`thenable`对象,则进行`Promise`处理,如果是其他对象,则直接`resolve`该对象;

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 三种状态,pending等待,fulfilled成功,rejected失败
    this.result = undefined; // 成功返回结果
    this.reason = undefined; // 失败返回结果
    this.onResolvedCallbacks = []; // 成功回调数组
    this.onRejectedCallbacks = []; // 失败回调数组
    const resolve = result => {
      if (this.state === 'pending') {
        this.result = result;
        this.onResolvedCallbacks.forEach(fn => fn());
        this.state = 'fulfilled';
      }
    }
    const reject = reason => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
        this.state = 'rejected';
      }
    }
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // then方法返回一个Promise实例
    const returnPromise = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // x这里是onFulfilled方法的返回值
        const x = onFulfilled(this.result);
        // 封装handlePromise函数处理里面的逻辑
        this.handlePromise(x, resolve, reject);
      }
      if (this.state === 'rejected') {
        const x = onRejected(this.reason);
        this.handlePromise(x, resolve, reject);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          const x = onFulfilled(this.result);
          this.handlePromise(x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          const x = onRejected(this.reason);
          this.handlePromise(x, resolve, reject);
        });
      }
    });
    return returnPromise;
  }

  handlePromise(x, resolve, reject) {
    const then = x ? x.then : undefined;
    if (typeof x === 'object' && typeof then === 'function') {
      try {
        then.call(x, res => {
          resolve(res);
        }, err => {
          reject(err);
        });
      } catch(error) {
        reject(error);
      }
    } else {
      resolve(x);
    }
  }
}
```

继续深究,上面的代码并没有处理一种错误行为——循环引用,即下面的这种写法:

```js
  const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 0);
  });
  const p2 = p1.then(res => {
    console.log(res); // success
    return p2; // 没有报错
  });
```

为此可以进一步优化`handlePromise`方法,判断`returnPromise`和`x`是否相等,相等则报`TypeError`错误;需要注意的是,需要把`returnPromise`作为参数传入`handlePromise`,但在使用`handlePromise`方法时,`returnPromise`尚未定义,因此需要用`setTimeout`包装,使它进入下一个事件循环:

```js
  then(onFulfilled, onRejected) {
    // then方法返回一个Promise实例
    const returnPromise = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 用setTimeout包装
        setTimeout(() => {
          // x这里是onFulfilled方法的返回值
          const x = onFulfilled(this.result);
          // 封装handlePromise函数处理里面的逻辑
          this.handlePromise(returnPromise, x, resolve, reject);
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          const x = onRejected(this.reason);
          this.handlePromise(returnPromise, x, resolve, reject);
        }, 0);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.result);
            this.handlePromise(returnPromise, x, resolve, reject);
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason);
            this.handlePromise(returnPromise, x, resolve, reject);
          }, 0);
        });
      }
    });
    return returnPromise;
  }

  handlePromise(returnPromise, x, resolve, reject) {
    // 如果returnPromise和x相等,则是循环引用,报错
    if (returnPromise === x) {
      return reject(new TypeError('循环引用'));
    }
    const then = x ? x.then : undefined;
    if (typeof x === 'object' && typeof then === 'function') {
      try {
        then.call(x, res => {
          resolve(res);
        }, err => {
          reject(err);
        });
      } catch(error) {
        reject(error);
      }
    } else {
      resolve(x);
    }
  }
```

继续深究,在`Promise`应用中,有时候会在`resolve`中嵌套`Promise`,如下示例:

```js
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  });
});
p1.then(res => {
  return new MyPromise((resolve, reject) => {
    resolve(new MyPromise(() => {
      resolve('resolve嵌套Promise');
    }));
  })
}).then(res => {
  console.log(res);
});
```

为此可以进一步优化`handlePromise`方法,递归解析,完整代码如下:

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 三种状态,pending等待,fulfilled成功,rejected失败
    this.result = undefined; // 成功返回结果
    this.reason = undefined; // 失败返回结果
    this.onResolvedCallbacks = []; // 成功回调函数数组
    this.onRejectedCallbacks = []; // 失败回调函数数组
    const resolve = result => {
      // 加一层状态为pending的判断,确保只有第一次resolve有效,reject同理
      if (this.state === 'pending') {
        this.result = result;
        // 遍历数组,执行里面的函数
        this.onResolvedCallbacks.forEach(fn => fn());
        // 改变状态为fulfilled
        this.state = 'fulfilled';
      }
    }
    const reject = reason => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
        this.state = 'rejected';
      }
    }
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // then方法返回一个Promise实例
    const returnPromise = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 用setTimeout包装,这样才能使用returnPromise
        setTimeout(() => {
          // 用x保存onFulfilled方法的返回值
          const x = onFulfilled(this.result);
          // 封装handlePromise函数处理里面的逻辑
          this.handlePromise(returnPromise, x, resolve, reject);
        });
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          const x = onRejected(this.reason);
          this.handlePromise(returnPromise, x, resolve, reject);
        });
      }
      // 用回调函数数组来处理异步,发布订阅模式
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.result);
            this.handlePromise(returnPromise, x, resolve, reject);
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason);
            this.handlePromise(returnPromise, x, resolve, reject);
          });
        });
      }
    });
    return returnPromise;
  }

  handlePromise(returnPromise, x, resolve, reject) {
    // 如果returnPromise和x相等,报循环引用的TypeError
    if (returnPromise === x) {
      reject(new TypeError('循环引用!'));
    }
    const then = x ? x.then : undefined;
    // 满足条件,就认为是一个Promise实例或thenable对象
    if (typeof x === 'object' && typeof then === 'function') {
      try {
        then.call(x, res => {
          // 不考虑resolve嵌套Promise,就直接resolve结果
          resolve(res);
          // 考虑resolve嵌套Promise,就递归解析
          this.handlePromise(returnPromise, res, resolve, reject)
        });
      } catch(e) {
        reject(e);
      }
    } else {
      // 不是Promise实例,直接resolve
      resolve(x);
    }
  }
}


const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  });
});
p1.then(res => {
  console.log(res); // success
  return new MyPromise((resolve, reject) => {
    resolve(new MyPromise(() => {
      resolve('resolve嵌套Promise');
    }));
  })
}).then(res => {
  console.log(res); // resolve嵌套Promise
});
```

关于`Promise`的手写就先到这里了,有时间再回来继续深究.