注意, 过滤器在`vue3`已经弃用.

## 过滤器`filter`

管道用法:

```html
<p>{{time | timeFormater('YYYY')}}</p>
```

- 局部过滤器:

  ```js
  filters: {
  	'timeFormater', function (value, p1) {
  		return time.format(p1);
  	}
  }
  ```

  其中,函数第一个参数是数据本身,即`time`

  第二个参数是传入的形参,这里就是`'YYYY'`

- 全局过滤器:

  ```js
  Vue.filter('timeFormater', function (value, p1) {
  	return time.format(p1);
  });
  ```

注:

1. 过滤器默认第一个参数为数据本身, 也可以接受额外参数

2. 多个过滤器可以串联

   ```html
   <p>{{time | timeFormater1() | timeFormater2()}}</p>
   ```

3. 过滤器并不会改变原本的数据, 而是产生新的对应的数据

