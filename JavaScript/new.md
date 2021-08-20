在调用`new`的过程中会发生四件事情:

- 创建一个新对象
- 新对象的`__proto__`指向构造函数的`prototype`
- 执行构造函数,绑定构造函数的`this`为新创建的对象
- 如果构造函数有返回值,且返回值为引用类型,`new`这个构造函数返回这个返回值;否则返回创建的新对象.

## 手写一个`new`

```js
  // Fn 构造函数 args 传入构造函数的参数
  function myNew(Fn, ...args) {
    // Object.create方法创建一个对象,第一个参数指定该对象的__proto__
    const instance = Object.create(Fn.prototype);
    // 执行构造函数Fn,绑定this为instance,并获取返回值
    const res = Fn.apply(instance, args);
    // 如果构造函数的返回值res是引用类型,返回res; 否则返回instance
    return res instanceof Object ? res : instance;
  }
```


