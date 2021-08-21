## `Promise`的优缺点

1. 优点:

   - 解决回调地狱(`Callback Hell`)问题,使代码更加扁平可读(优雅的链式调用);

   - 更好的进行错误捕获

     ```js
       function fn(callback) {
         setTimeout(() => {
           throw Error('error!!!');
         }, 0);
       }
       try {
         fn();
       } catch(e) {
         console.log('defeat', e); // 不会执行
       }
     ```

     异步的回调里面抛出的错误,在外部`catch`不到.

2. 缺点:

   - `Promise`在实例化时就会立即执行,无法中途取消;
   - 如果不设置回调函数,`promise`内部抛出的错误不会反应到外部;
   - 处于`pending`状态时,无法得知目前进展在哪一个阶段(刚刚开始还是即将完成)


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

## `Promise.all()`

`Promise`提供了一个重要的方法`Promise.all`,可以支持多个并发的请求,获取并发请求中的数据.来解决下面的几个问题:

> `Promise.all()`执行情况是怎样的?

- `Promise.all()`接受一个可迭代对象(如数组)作为参数,数组项可以是`Promise`,也可以是**常量**;

- 只有数组里面全部的`Promise`执行成功后,才会返回完成状态的结果,且该结果也是一个数组;

- 如果数组中有一个`Promise`执行报错,整个`Promise.all()`执行失败,可用`catch`获取报错信息;

  

> `Promise.all()`接收的参数是数组,数组项一定是`Promise`吗?

​	不一定,数组项可以是`Promise`,也可以是**常量**;



> `Promise.all()`的参数数组中,有一个`Promise`报错了,其他`Promise`还会执行吗?

​	会,`Promise`在实例化的时候就执行了.`await`和`.then()`只是为了拿到结果.



> 手写一个`Promise.all()`

​	手写思路:
​	1. `Promise.all()`返回的是一个`Promise`实例;
​	2. 传入的参数是否为数组,不是则报错;
​	3. 参数数组项可以是`Promise`,也可以是常量;
​	4. `Promise.all()`中传入的数组,输入是什么顺序,输出就是什么顺序


完整代码:(细节见注释啦)

```js
function promiseAll(promiseArray) {
  // 返回一个Promise实例
  return new Promise((resolve, reject) => {
    // 判断传入的参数是不是一个数组,不是的话抛出错误
    if (!Array.isArray(promiseArray)) {
      return reject(new Error('Not an array!'));
    }

    // 结果数组
    const res = [];
    const promiseLength = promiseArray.length;
    // 判断是否可以resolve的计数
    let count = 0;

    for (let i=0; i<promiseLength; i++) {
      // 使用Promise.resolve()同时解决当前项为Promise和常量的情况
      Promise.resolve(promiseArray[i])
      .then(result => {
        count++;
        // 使用坐标的方式给res添加值,保证结果数组和输入数组一一对应
        res[i] = result;
        if (count === promiseLength) {
          resolve(res);
        }
      })
      .catch(e => {
        reject(e)
      });
    }
  });
}
```

解析上面代码中的几个点:

1. `Promise.resolve()`

   一般来说,我们可以通过判断当前数组项是`Promise`实例还是常量,再进行结果的处理.但是这么做的话就需要分开两步去处理,代码量增加,如:

   ```js
   const isPromise = Object.prototype.toString.call(promiseArray[i]) === '[object Promise]';
   if (isPromise) {
   	promiseArray[i].then(result => {
   		res[i] = result;
   	});
   } else {
   	res[i] = promiseArray[i];
   }
   ```

   直接通过`Promise.resolve()`进行处理既简洁又优雅,这和`Promise.resolve`的功能有关:

   - `Promise.resolve()`传参为常量时,会返回一个新的`Promise`对象,并将参数`resolve`出去;
   - `Promise.resolve()`传参为`Promise`实例时,会原封不动的返回这个`Promise`实例;

2. 需要通过坐标的方式往结果数组`res`中添加值,而不能用`res.push()`.原因是在异步操作中,我们不知道哪一个数组项的`Promise`先执行`then`方法,如果使用`res.push()`,就无法控制`res`的顺序;

3. 代码中使用`count`计数来和`promiseArray.length`作比较,而不使用`res.length`,原因是在`JavaScript`中,使用坐标方式往数组中添加值,会自动更新数组长度,如:

   ```js
   const res = [];
   res[5] = 1;
   console.log(res.length); // 6
   ```



## `Promise.race()`

`Promise.race()`用法上与`Promise.all()`类似,参数也是一个数组,数组项可以为`Promise`实例,也可以为常量;

不同的是,`Promise.race()`只返回最快返回的那个结果,不论这个结果是成功的状态还是失败的状态.如:

```js
p1 = new Promise((resolve, reject) => {
  reject('error');
});
p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000)
});
Promise.race([p2, p1, 3])
.then(res => {
  console.log(res); // 不打印
})
.catch(e => {
    console.log(e); // error
});
```



## `Promise.resolve()`

前面手写`Promise.all`的时候已经提到这个方法了,这里还是得大致说明一下这个"优雅"的方法.事实上,使用这个方法的关键在于区分传入的参数类型.

`Promise.resolve()`传入的参数可分为四种情况:

1. `Promise`实例

   如果参数是一个`Promise`实例,那么`Promise.resolve()`将原封不动地返回这个实例.

2. `thenable`对象

   `thenable`对象指的是具有`then`方法的对象,如:

   ```js
   let thenable = {
   	then: (resolve, reject) => {
           resolve('then')
       }	
   }
   ```

   `Promise.resolve()`会将这个对象转换为一个`Promise`对象,并立即执行`thenable`对象的`then`方法.如:

   ```js
   let p1 = Promise.resolve(thenable);
   p1.then(res => {
       console.log(res); // then
   });
   ```

3. 不具有`then`方法的对象

   如果参数是不具有`then`方法的对象,`Promise.resolve()`返回一个新的`Promise`,并将参数`resolve`出去.如:

   ```js
   const p = Promise.resolve('then');
   p.then(res => {
       console.log(res); // then
   });
   ```

4. 不传参数

   如果不传任何参数,实际上处理方式和第三种情况是相同的,`Promise.resolve()`会返回一个新的`Promise`,并`resolve`出去;



## `Promise`限制并发请求问题

这是一道常见的面试题,一起来看看:

```js
const urls = [
  'http://jsonplaceholder.typicode.com/posts/1',
  'http://jsonplaceholder.typicode.com/posts/2', 
  'http://jsonplaceholder.typicode.com/posts/3', 
  'http://jsonplaceholder.typicode.com/posts/4',
  'http://jsonplaceholder.typicode.com/posts/5', 
  'http://jsonplaceholder.typicode.com/posts/6', 
  'http://jsonplaceholder.typicode.com/posts/7', 
  'http://jsonplaceholder.typicode.com/posts/8',
  'http://jsonplaceholder.typicode.com/posts/9', 
  'http://jsonplaceholder.typicode.com/posts/10'
]
function loadDate(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
  });
}
```

> 在 `urls` 数组中存放了 10 个接口地址。同时还定义了一个 `loadDate` 函数，这个函数接受一个 `url` 参数，返回一个 `Promise` 对象，该 `Promise` 在接口调用成功时返回 `resolve`，失败时返回 `reject`
>
> 要求: 任意时刻,同时下载的链接数量不可以超过3个.
>
> 试写出一段代码实现这个需求,要求尽可能快速地将所有接口中的数据得到.

```
解题思路:
1. 首先并发请求3个url中的数据
2. 当其中一条url请求得到数据后,立即请求一条新的url中的数据
3. 始终保持并发数在3个,直到所有需要加载的url全部完成请求并得到数据
```

解法1:`Promise`

```js
  const urls = [
    {img: 'image1', time: 1000},
    {img: 'image2', time: 300},
    {img: 'image3', time: 400},
    {img: 'image4', time: 800},
    {img: 'image5', time: 500},
    {img: 'image6', time: 1000},
    {img: 'image7', time: 600},
    {img: 'image8', time: 400},
  ];
  const loadImg = (url) => new Promise((resolve, reject) => {
    console.log(url.img + 'start');
    setTimeout(() => {
      console.log(url.img + 'end');
      resolve();
    }, url.time);
  });

  function limitLoad(urls, handler, limit) {
    // 拷贝一个数组(注意这里是浅拷贝)
    const sequence = [...urls];
    let promises = [];
    // 实现并发请求达到最大值limit
    promises = sequence.splice(0, limit).map((url, index) => {
      // 这里返回的index是任务在promises的索引,用于在Promise.race后找到完成的任务索引
      return handler(url).then(() => index);
    });
    // 返回最快请求成功的promise
    let p = Promise.race(promises);
    for (let i=0; i<sequence.length; i++) {
      p = p.then(res => {
        // 用新的Promise替换最快改变状态的Promise
        promises[res] = handler(sequence[i]).then(() => res);
        return Promise.race(promises);
      });
    }
  }

  limitLoad(urls, loadImg, 3);
```

 
