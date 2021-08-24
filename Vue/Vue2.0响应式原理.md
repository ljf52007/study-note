大致来说,`Vue2.0`的响应式原理核心是`ES5`的`Object.defineProperty()`中访问器属性的`get`和`set`方法:

- `data`中声明的属性都被添加了访问器属性,当读取`data`中的数据时,自动调用`get`方法;当修改`data`中的数据时,自动调用`set`方法;
- 检测到数据的变化,会通知观察者`Watcher`.观察者`Watcher`触发重新渲染当前组件(子组件不会重新渲染),生成新的虚拟`DOM`树.如下图:

![](https://gitee.com/ljf52007/note/raw/master/images/Vue/vue2.0%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%861.png)

- `Vue`遍历并对比新旧虚拟`DOM`树中每个节点的差别,并记录下来.

`Vue`采用`数据劫持`结合`发布-订阅模式`的方法,通过`Object.defineProperty()`来劫持`data`中各个属性的`setter`和`getter`