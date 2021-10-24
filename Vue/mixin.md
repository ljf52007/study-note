`mixin`,混入,用于分发`vue`组件中的可复用功能

1. `data`数据以组件的优先;
2. `methods`,`components`,`directives`:合并为一个对象,组件对象的键值对优先;
3. 同名的钩子函数:合并为数组,都会被调用,混入对象的钩子将在组件自身的钩子之前调用;

局部混入:

```js
mixins: [MixinTest]
```

全局混入:(将影响每一个之后创建的`vue`实例,常用来为自定义选项注入处理逻辑)

```js
Vue.mixin(MixinTest);
```

