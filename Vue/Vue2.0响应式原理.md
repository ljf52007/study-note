`Vue2.x`响应式原理核心是`Object.defineProperty`;

- 简单来说,`Vue`在初始化数据时,会根据用户传入的`data`重新定义一个`Observer`类型的对象,该对象对`data`中所有的属性通过`Object.defineProperty`添加访问器属性`getter`和`setter`,用来对数据进行观测:

  - 当读取`data`中的数据时,自动调用`get`方法,对依赖进行收集(收集当前组件的`Watcher`);

  - 当修改`data`中的数据时,自动调用`set`方法,通知相关依赖进行更新操作.

- 具体来说(从源码角度出发)

  1. `Vue`在`initData()`的时候,会通过`vm.$options.data`拿到用户输入的数据,通过调用`observe`方法对其进行观测.

     ```js
     function initData(vm: Component) {
     	let data = vm.$options.data;
         ...
         observe(data, true /* asRootData */);
     }
     ```

  2. `observe`方法返回一个`Observer`类型的实例

     ```js
     export function observe (value: any, asRootData: ?boolean): Observer | void {
         ...
         ob = new Observer(value);
         ...
         return ob;
     }
     ```

  3. 在`Observer`构造函数内部,区分传入的数据为数组还是对象:

     如果是数组,则遍历数组,对数组的每一项递归调用`observe`;

     如果是对象,则调用`walk`方法,遍历数据的属性,通过`defineReactive`方法为属性添加访问器属性`getter`和`setter`;

     ```js
     export class Observer {
       value: any;
       dep: Dep;
       vmCount: number; // number of vms that have this object as root $data
     
       constructor (value: any) {
         this.value = value
         this.dep = new Dep()
         this.vmCount = 0
         def(value, '__ob__', this) // 给数据添加已观测标识
         if (Array.isArray(value)) { // 如果是数组
           if (hasProto) {
             protoAugment(value, arrayMethods)
           } else {
             copyAugment(value, arrayMethods, arrayKeys)
           }
           this.observeArray(value) // 遍历数组的每一项,递归调用observe
         } else {
           this.walk(value) // 调用walk方法
         }
       }
     
       walk (obj: Object) {
         const keys = Object.keys(obj)
         // 遍历对象属性,为每一个属性执行defineReactive
         for (let i = 0; i < keys.length; i++) {
           defineReactive(obj, keys[i])
         }
       }
     ```

     

  4. `defineReactive`方法是数据响应的核心方法,它的核心就是通过`Object.defineProperty`对数据进行劫持,实现数据响应式.

     ```js
     /**
      * Define a reactive property on an Object.
      */
     export function defineReactive (
       obj: Object,
       key: string,
       val: any,
       customSetter?: ?Function,
       shallow?: boolean
     ) {
       const dep = new Dep()
     
       const property = Object.getOwnPropertyDescriptor(obj, key)
       if (property && property.configurable === false) {
         return
       }
     
       // cater for pre-defined getter/setters
       const getter = property && property.get
       const setter = property && property.set
       if ((!getter || setter) && arguments.length === 2) {
         val = obj[key]
       }
     
       let childOb = !shallow && observe(val)
       
       // 核心方法Object.defineProperty
       Object.defineProperty(obj, key, {
         enumerable: true,
         configurable: true,
         get: function reactiveGetter () {
           const value = getter ? getter.call(obj) : val
           if (Dep.target) {
             dep.depend()
             if (childOb) {
               childOb.dep.depend()
               if (Array.isArray(value)) {
                 dependArray(value)
               }
             }
           }
           return value
         },
         set: function reactiveSetter (newVal) {
           const value = getter ? getter.call(obj) : val
           /* eslint-disable no-self-compare */
           if (newVal === value || (newVal !== newVal && value !== value)) {
             return
           }
           /* eslint-enable no-self-compare */
           if (process.env.NODE_ENV !== 'production' && customSetter) {
             customSetter()
           }
           // #7981: for accessor properties without setter
           if (getter && !setter) return
           if (setter) {
             setter.call(obj, newVal)
           } else {
             val = newVal
           }
           childOb = !shallow && observe(newVal)
           dep.notify()
         }
       })
     }
     ```
     
  5. 可以看到,















`Vue2.0`的响应式原理核心是通过`ES5`的`Object.defineProperty`中访问器属性的`get`和`set`方法.`data`中声明的属性都被添加了访问器属性,当读取`data`中的数据时,自动调用`get`方法;当修改`data`中的数据时,自动调用`set`方法.

检测到数据的变化,会通知观察者`Watcher`.观察者`Watcher`自动触发重新`render`当前组件(子组件不会重新渲染),生成新的虚拟`DOM`树.如下图:

![](https://gitee.com/ljf52007/note/raw/master/images/Vue/vue2.0%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%861.png)

`Vue`遍历并对比新旧虚拟`DOM`树中每个节点的差别,并记录下来.

