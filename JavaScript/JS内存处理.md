## 内存生命周期

```
1. 内存分配: 声明变量,函数,对象的时候,js会自动分配内存;
2. 内存使用: 调用的时候,使用的时候;
3. 内存回收: 垃圾回收;
```



## `JS`垃圾回收机制

1. 找出不再使用的变量,释放其占用内存(垃圾回收机制不是对变量进行处理,而是对内存中存储的值进行处理);
2. 垃圾收集器在固定的时间间隔运行

> `js`垃圾回收机制有哪些回收策略?

1. 引用计数(不常用)

   引用计数的含义是跟踪记录每个值被引用的次数。

   当声明了一个变量并将一个引用类型值赋值该变量时，则这个值的引用次数就是1.如果同一个值又被赋给另外一个变量，则该值得引用次数加1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。

   引用计数有一个**致命的缺陷**,就是循环引用无法回收.

   ```js
     let a = {}; // 内存开辟空间,{}占用内存,引用计数1
     let b = {}; // 内存开辟空间,{}占用内存,引用计数1
     a.c = b; // b值引用计数+1=2, a值为{c: b}
     b.d = a; // a值引用计数+1=2, b值为{d: a}
     a = null; // a前任值{c: b}引用计数为1, b值为{d: null}
     // 这时候a前任{c: b}没有被引用,但是引用计数为1,无法回收
   ```

2. 标记清除(重用)

   标记清除算法将"不再使用的对象"定义为"无法达到的对象".简单来说,就是从根部(在`js`就是全局对象)出发,定时扫描内存中的对象.凡是能从根部到达的对象,都是还要使用的,而无法由根部出发触及到的对象被标记为不再使用,稍后进行回收.

   从这个概念可以看出,无法触及的对象包含了没有引用的对象这个概念(没有任何引用的对象也是无法触及的对象),但反之未必成立.

   ```
   工作流程:
   1. 垃圾收集器会在运行的时候给内存中的所有变量都添加标记;
   2. 从根部出发将能触及到的对象的标记清除;
   3. 那些还存在标记的变量视为准备删除的变量;
   4. 最后垃圾收集器会执行最后一步内存清除和整理的工作,销毁那些带标记的值并回收他们所占用的内存空间.
   ```

   



## `JS`常见的内存泄漏

从本质上讲,内存泄漏就是不再被需要的内存,由于某种原因,无法被释放.

> `js`有哪些常见的内存泄漏

1. 全局变量

   ```js
   window.a = 'foo';
   window.a = null; // 手动清除
   ```

2. 未被清除的定时器和回调

   ```js
   const timer = setTimeout(() => {}, 1000);
   clearTimeout(timer); // 手动清除
   const interval = setInterval(() => {}, 1000);
   clearInterval(interval); // 手动清除
   ```

3. 闭包

   ```js
   function foo () {
     let count = 0;
     return function bar() {
       count++;
       console.log(count);
     }
   }
   
   const fn = foo();
   fn(); // 1
   fn(); // 2
   fn(); // 3
   fn = null; // 手动销毁
   fn(); // TypeError
   ```

   每次调用`fn`时，`count`值都基于上一次的值增加1，说明`count`的引用一直保存在内存中得不到销毁。只能手动进行销毁`fn=null`;

4. `DOM`的引用

   ```js
   const elements = {
   	image: document.getElementById('image')
   }
   document.body.removeChild(document.getElementById('image'));
   elements.image = null;
   ```



> 如何避免内存泄漏

1. 减少不必要的全局变量

   特别要注意一些意外创建全局变量的情况,如:

   ```js
   function foo() {
   	bar = 123; // 没有关键字声明,实际上是全局变量window.bar = 123
   	this.baz = 456; // this在这里指代window,因此baz也是全局变量window.baz = 456
   }
   foo();
   ```

   

2. 使用完数据后,及时解除引用



## 计算数据占用字节数

> 实现`sizeOf`函数,传入一个参数`object`,计算这个`object`占用了多少`bytes`

```
手写思路:
1. 首先明确在JavaScript中,不同数据类型在内存中存储的字节数是不同的.(因此不能用toString统一转换为字符串再去计算)
	number: 8字节
	string: 每个长度 2字节
	boolean: 4字节
2. 对于key-value的对象,key和value都占用内存空间,因此都要计算字节数
3. 不同的key指向同一个引用类型的value,仅需计算一次(key值仍要计算)
```

```js
const seen = new WeakSet();
function sizeOfObject(obj) {
  // 如果为null
  if (obj === null) {
    return 0;
  }
  let bytes = 0;
  // 获取key数组
  const properties = Object.keys(obj);
  for (let i=0; i<properties.length; i++) {
    const key = properties[i];
    // 如果有两个key指向的value是相同的引用类型值(在堆内存中是同一个地址),如:
    // let foo = {a : 1}
    // let obj = {b: foo, c: foo}
    // 此时不应该重复计算该引用类型的字节数
    // 但要注意虽然已经计算过的引用类型值不用重复计算,但是key依然需要计算
    bytes += calculator(key);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (seen.has(obj[key])) {
        continue;
      }
      seen.add(obj[key]);
    }
    // 对象里面的key也是占用内存空间的
    bytes += calculator(obj[key]);
  }
  return bytes;
}

function calculator(obj) {
  // 判断传入参数的数据类型
  const objType = typeof obj;
  switch (objType) {
    case 'number': {
      return 8;
    }
    case 'string': {
      return obj.length * 2;
    }
    case 'boolean': {
      return 4;
    }
    case 'object': {
      // 数据类型为数组引用类型
      if (Array.isArray(obj)) {
        return obj.map(calculator).reduce((preValue, curValue) => preValue + curValue);
      } else {
        // 数据类型为非数组引用类型
        return sizeOfObject(obj);
      }
    }
    default: {
      return 0;
    }
  }
}

const foo = {
  a: 1,
  b: 2
}
const obj = {
  c: 1,
  d: true,
  e: foo,
  f: foo,
  g: [1,'string'],
  111: 'string'
}
console.log(calculator(obj));
```
