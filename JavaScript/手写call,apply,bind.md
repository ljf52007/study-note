`call`,`apply`,`bind`都用于绑定`this`,可以做到手动改变`this`的指向.

## 手写`call`

```
手写思路:
1. 调用方是函数对象,不是函数则报错;
2. 第一个参数context为需要绑定的this,如果不传,默认为window;
3. 可以传入多个参数作为调用函数的参数;
4. 使用Symbol创建一个context的唯一属性fn,将属性值置为需要调用的函数;
5. 调用context[fn],利用谁调用this指向谁的原理,改变调用函数的this;
6. 将context上的fn属性删除
```

```js
// context为绑定的this指向,默认为window
Function.prototype.myCall = function (context = window, ...args) {
  // 如果调用方不是函数,报错
  if (typeof this !== 'function') {
    throw new TypeError('调用方不是函数!');
  }
  // 创建context的唯一属性(以免和context本身的其他属性有命名冲突)
  const fn = Symbol('fn');
  // 将context的fn属性值置为需要调用的函数
  context[fn] = this;
  // 调用context[fn],这里相当于context.fn(),利用谁调用函数,函数的this指向谁的原理
  const result = context[fn](...args);
  // 删除context[key]释放内存，否则context的属性会越来越多
  delete context[fn];
  // 返回函数结果
  return result;
}
```



## 手写`apply`

`apply`的手写思路和`call`是一模一样的,只有一个区别,就是在调用原函数的时候,`call`传入参数是以逗号隔开的,而`apply`传入的是一个参数数组.

```js
Function.prototype.myApply = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('调用方不是函数');
  }
  // apply要求要以数组形式进行传参
  if (!Array.isArray(args)) {
    throw new Error('要以数组形式传参');
  }
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
```



## 手写`bind`

`bind`的手写思路与`call`和`apply`大致相同,但略微有些复杂

- `bind`返回的是一个函数,对于函数来说有两种方式调用,一种是直接调用:

  ```js
  fn.bind()();
  ```

  另一种是通过`new`的方式

  ```js
  new fn.bind()();
  ```

  因此需要加多一层是否为`new`形式调用的判断和处理.

- `bind`可以实现这样的代码

  ```js
  fn.bind(obj, '参数1')('参数2');
  ```

  因此要考虑参数的拼接.

```js
Function.prototype.myBind = function (context = window, ...outerArgs) {
  if (typeof this !== 'function') {
    throw new Error('调用方不是函数')
  }
  const fn = Symbol('fn');
  context[fn] = this;
  return function F(...innerArgs) {
    let result;
    // 这里的this是函数F内部的this,和上面的this已经代表不同的含义
    // 如果this是函数F的实例,说明函数F此时是以new的形式调用
    if (this instanceof F) {
      // 参数拼接
      result = new context[fn](...outerArgs, ...innerArgs);
    } else {
      result = context[fn](...outerArgs, ...innerArgs);
    }
    delete context[fn];
    return result;
  }
}
```
