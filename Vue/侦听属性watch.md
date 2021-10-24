## 侦听属性`watch`

当被侦听的属性发生变化时, 回调函数自动调用, 进行相关操作

侦听的两种写法:

1. `new Vue`时传入`watch`配置

   ```js
   watch: {
       n: {
           immediate: true, // 初始化时让handler调用一下,布尔值,默认为false
           // 侦听属性变化时调用
           handler (newValue, oldValue) {
               console.log(newValue, oldValue);
           }
       }
   }
   ```

   `immediate`配置初始化时是否调用`handler`,默认为`false`.

   `handler`在侦听属性变化时调用.

2. 通过`vm.$watch()`进行侦听

   ```js
   vm.$watch('n', {
   	immediate: true, // 初始化时让handler调用一下,布尔值,默认为false
   	// 侦听属性变化时调用
   	handler (newValue, oldValue) {
   		console.log(newValue, oldValue);
   	}
   });
   ```



## 深度侦听

`deep`配置表示是否深度侦听,默认为`false`

深度侦听可以侦听到多级结构中所有属性的变化.如

```js
<h1>{{numbers.a}}</h1>
<button @click="numbers.a++">add</button>
```

```js
data () {
	numbers: {
		a: 1,
		b: 2
	}
},
watch: {
    numbers: {
        deep: true,
        handler (newValue, oldValue) {
            console.log(newValue, oldValue);
        }
	}
}
```

对`numbers`深度侦听, 可以侦听到`numbers.a`的变化.



## 简写

如果没有`deep, immediate`等其他配置项, 可以采用简写形式:

```js
watch: {
	n (newValue, oldValue) {}
}
```

```js
vm.$watch('n', function (newValue, oldValue) {})
```

