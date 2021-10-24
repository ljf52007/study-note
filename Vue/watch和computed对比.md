## `watch`和`computed`对比

1. `computed`能实现的,`watch`也能实现

2. `computed`有缓存功能,`watch`没有缓存功能

3. `computed`不支持异步操作, `watch`支持异步操作

   ```js
   computed: {
   	getFullName () {
   		setTimeout(() => {
   			return this.firstName + this.lastName; // 返回值作为异步回调的返回, 而不是计算属性的返回
   		});
   	}
   }
   ```

4. `watch`的侦听数据必须是在`data`中声明过或从父组件中传递过来的`props`中的数据, 当数据变化时触发其他操作.



顺带一提:

- 所有被`Vue`管理的函数, 最好写成普通函数, `this`才指向`vm`或组件实例对象;
- 所有不被`Vue`所管理的回调(如定时器, `ajax`, `Promise`的回调), 最好写成箭头函数,` this`才指向`vm`或组件实例对象;