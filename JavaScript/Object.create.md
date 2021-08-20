`Object.create`方法创建一个对象,该方法接受两个参数：第一个参数为新对象的`__proto__`，第二个参数描述了新对象的属性，格式如在`Object.defineProperties()` 中使用的一样.

这里手写只考虑第一个参数:

```js
Object.prototype.myCreate = function (proto) {
  function F() {};
  F.prototype = proto;
  return new F();
}
```


