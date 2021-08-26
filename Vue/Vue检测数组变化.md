`push,pop,shift,unshift,splice,sort,reverse`:`Vue`重写了数组的原型对象,当调用这些方法的时候,手动通知视图更新

遍历数组,对数组每一项都进行了观测,如果数组项是对象,会把这个对象设置为`Observer`

```js
// 注意区别
const arr = [{a: 1}, 2];
arr[0].a = 2; // 会更新
arr[1] = 3; // 不会更新
```



