## 数据代理

- 概念:通过一个对象`A`代理操作另一个对象`B`中的属性(包括读和写);

- 核心:通过`Object.defineProperty()`中的访问器属性`getter`和`setter`

  ```js
  const a = {
      x: 100
  };
  const b = {
      x: 200
  };
  Object.defineProperty(b, 'x' ,{
      get() {
          // 读取对象b的x属性时,返回对象a的x属性
          return a.x;
      },
      set(newValue) {
          // 修改对象b的x属性值时,实际上是对对象a的x属性进行修改操作
          a.x = newValue;
      }
  });
  
  b.x = 300;
  console.log(a.x); // 300
  console.log(b.x); // 300 读取对象b的x属性值,返回的是对象a的x属性值
  ```

## `Vue`中的数据代理

`Vue`中通过`vm(new Vue()的实例)`对象来代理操作`data`对象中的属性(包括读和写).

![](https://gitee.com/ljf52007/note/raw/master/images/Vue/Vue%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86.png)

> 体现在哪里?
>
> ```js
> const vm = new Vue({
> 	el: '#app',
> 	data: 
> 	{
> 		name: '名称'
> 	}
> })
> ```
>
> 在`data`中定义的属性,并不是定义在`vm`中,而是定义在`vm.options.data`中.然而,因为`vue`底层做了数据代理,我们可以直接通过`vm.name`来获取`data`中的属性,以及对它进行修改.这也就是为什么我们可以直接在模板中这么使用:
>
> ```html
> <div>{{name}}</div>
> ```

> `Vue`中使用数据代理的好处?
>
> 能够更加方便地操作`data`中的数据.