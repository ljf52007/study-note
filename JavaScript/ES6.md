## `ES6`用过什么?

- `let`,`const`声明变量的关键字;
- 解构赋值;
- 剩余参数;
- 箭头函数;
- 扩展运算符;
- 模板字符串``;
- 数组方法`find(),findIndex(),includes()`;
- 字符串方法`startWith(),endWith(),repeat()`;
- 集合`Set`数据结构
- `Promise`
- `class`

## 分别讲讲这些新特性

### 1 `let,const`

`let`和`const`都是声明变量的关键字

|         | 作用域       | 变量提升       | 内存地址是否可以更改 |
| ------- | ------------ | -------------- | -------------------- |
| `var`   | 函数级作用域 | 变量提升       | 可更改               |
| `let`   | 块级作用域   | 不存在变量提升 | 可更改               |
| `const` | 块级作用域   | 不存在变量提升 | 不可更改             |

- 块级作用域:

  ```js
  if (true){
  	let a = 10;
  }
  console.log(a); //ReferenceError: a is not defined
  ```

- 暂时性死区:

  ```js
  var tmp = 123;
  if(true){
  	tmp = 'abc';
  	let tmp;
  } //ReferenceError: Cannot access 'tmp' before initialization
  ```

- 不存在变量提升:

  ```js
  a = 1
  console.log(a)//ReferenceError: Cannot access 'a' before initialization
  let a
  ```

- `const`声明常量必须赋值

  ```js
  const PI; //SyntaxError: Missing initializer in const declaration
  ```

- `const`声明常量赋值后,值(内存地址)不能修改

  ```js
  const PI = 3.14;
  PI = 10; //Assignment to constant variable.
  ```

  ```js
  const arr = [100,200];
  arr[0] = 1;
  arr[1] = 2;
  console.log(arr); //[1,2]
  arr = [3,4]; //error:Assignment to constant variable.
  ```

  在`ES6`中，常量的含义是指向的对象不能修改，但是可以改变对象内部的属性.

> 经典面试题:下面代码输出结果是什么?
>
> ```js
> var arr = [];
> for (var i = 0; i < 2; i++) {
> arr[i] = function () {
> console.log(i); 
> }
> }
> arr[0](); // 2
> arr[1](); // 2
> ```
>
> 这道题的关键点在于变量`i`是全局作用域下的变量,函数执行时输出的`i`都是全局作用域下的`i`值.
>
> 
>
> 下面代码输出结果是什么?
>
> ```js
> let arr = [];
> for (let i = 0; i < 2; i++) {
> arr[i] = function () {
> console.log(i); 
> }
> }
> arr[0](); //0
> arr[1](); //1
> ```
>
> 此题的关键点在于每次循环都会产生一个块级作用域，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的`i`值.

### 2 解构赋值

> 数组解构

```js
let [a,b,c] = [1,2,3];
console.log(a); //1
console.log(b); //2
console.log(c); //3
```

如果解构不成功，变量的值为undefined：

```javascript
let [a] = [];
console.log(a); //undefined
let [b,c] = [1];
console.log(b); //1
console.log(c); //undefined
```

> 对象解构

```js
 let person = { name: 'zhangsan', age: 20 }; 
 let { name, age } = person;
 console.log(name); // 'zhangsan' 
 console.log(age); // 20
```

```js
let {name: myName, age: myAge} = person; // myName myAge 属于别名
 console.log(myName); // 'zhangsan' 
 console.log(myAge); // 20
```

### 3 剩余参数

剩余参数语法允许我们将一个不定数量的参数表示为一个数组:

```js
function fn(a,...b){
	console.log(a); //1
	console.log(b); //[2,3,4]
}
fn(1,2,3,4);
```

剩余参数语法允许和解构赋值配合使用:

```js
let students = ['张三','李四','王五'];
let [a,...b] = students;
console.log(a); //张三
console.log(b); //["李四", "王五"]
```

### 4 箭头函数

> 箭头函数与普通函数的区别

- 箭头函数不绑定`this`关键字,箭头函数中的`this`,指向的是函数定义位置的上下文`this`.即向外层作用域中,一层一层查找`this`,直到有`this`的定义;
- 箭头函数不可以当做构造函数,不可以使用`new`命令,否则会抛异常;
- 箭头函数不可以使用`arguments`对象,该对象在函数体内不存在.如果要使用,可以用`Rest`代替;
- 箭头函数不可以用`yield`命令,因此箭头函数不可以用作`Generator`函数;



> 下面代码输出什么结果?
>
> ```js
> var age = 100;
> var obj = {
> 	age: 200,
> 	say: () => {
> 		console.log(this); // window
> 		console.log(this.age); // 100
> 	}
> }
> obj.say();
> ```

箭头函数不绑定`this`,在`say`函数体中的`this`,指向的是`window`.



> 下面代码输出什么结果?
>
> ```js
> const obj = {
> foo() {
> console.log(this); // obj
> setTimeout(function () {
> setTimeout(function () {
> console.log(this); // window
> })
> 
> setTimeout(() => {
> console.log(this); // window
> })
> });
> 
> setTimeout(() => {
> setTimeout(function () {
> console.log(this); // window
> })
> 
> setTimeout(() => {
> console.log(this); // obj
> })
> })
> }
> }
> obj.foo();
> ```

这道题的关键是理解`setTimeout`内回调函数的`this`指向问题.《`JavaScript`高级程序设计》第二版中写到,"超时调用的代码都是在全局作用域中执行的,因此函数中`this`的值在非严格模式下指向`window`对象,严格模式下是`undefined`".

但是,如果回调函数是箭头函数,那么它的`this`指向依旧是当前函数体的上下文`this`.

现在我们一步一步来看上面的打印结果.

- 第一个打印`obj`:`obj`调用了`foo`函数,`foo`函数体的`this`指向`obj`;

- 第二个打印`window`:`setTimeout`回调函数是普通函数,函数体的`this`指向`window`;

- 第三个打印`window`:`setTimeout`回调函数是箭头函数,函数体的`this`指向当前上下文`this`,由于该`setTimeout`是在另一个`setTimeout`回调函数(普通函数)的函数体中,因此该上下文`this`指向`window`;

- 第四个打印`window`:理由同二;

- 第五个打印`obj`:`setTimeout`回调函数是箭头函数,函数体的`this`指向当前上下文`this`;由于该`setTimeout`是在另一个`setTimeout`回调函数(箭头函数)的函数体中,因此该上下文`this`指向`obj`;

### 5 扩展运算符`...`

> `ES6`扩展运算符能解决什么问题?

- `浅拷贝`

  `数组浅拷贝`

  数组的扩展运算符可以将数组转换为以逗号隔开的参数序列.

  如果想拷贝一个数组,以下的方法是错误的:                    

  ```js
  let arr1 = [1,2,3];
  let arr2 = arr1; // 这样拷贝是错误的,它会导致下面的问题
  arr2[0] = 4;
  console.log(arr1[0]); // 4 修改arr2,arr1受到影响
  ```

  可以像这样拷贝数组:

  ```js
  let arr1 = [1,2,3];
  let arr2 = [...arr1]; // 扩展运算符拷贝
  arr2[0] = 4;
  console.log(arr1[0]); // 1 修改arr2,arr1不受影响
  ```

  `对象浅拷贝`

  对象的扩展运算符用于取出参数对象中所有可遍历的属性,拷贝到当前对象之中;

  ```js
  let foo = {a: 1, b: 2};
  let bar = {...foo}; // {a: 1, b: 2}
  ```

  上述方法实际上等价于:

  ```js
  let foo = {a: 1, b: 2};
  let bar = Object.assign({}, foo); // {a: 1, b: 2}
  ```

  

- 数组或对象的拼接

  `数组拼接`

  根据数组扩展运算符的特点,可以如下拼接数组:

  ```js
  let arr1 = [1,2,3];
  let arr2 = [4,5,6];
  let arr3 = [...arr1, ...arr2];
  ```

  `对象拼接`

  `Object.assign()`用于对象的拼接(合并),第一个参数是目标对象,后面的参数都是源对象.如果目标对象与源对象有同名属性,或多个源对象有同名属性,则后面的属性会覆盖前面的属性.

  ```js
  const obj1 = {a: 1, b: 2};
  const obj2 = Object.assign({a: 0}, obj1); // {a: 1, b: 2}
  ```

  同样,如果用户自定义的属性放在扩展运算符后面,则同名属性会被覆盖掉;

  ```js
  const obj1 = {a: 1, b: 2};
  const obj2 = {...obj1, ...{a: 4, c: 3}}; // {a: 4, b: 2, c: 3}
  ```

  

- 将类数组转化为真正的数组

  ```js
  let oDivs = document.getElementsByTagName('div'); // 类数组
  oDivs = [...oDivs]; // 转换为真正的数组
  ```

### 6 模板字符串``

- 可以解析变量
- 可以调用函数
- 可以换行

### 7 数组方法

`find(),findIndex(),includes()`

### 8 字符串方法

`startWith(),endWith(),repeat()`

- `startsWith()`：表示参数字符串是否在原字符串的头部，返回布尔值

- `endsWith()`：表示参数字符串是否在原字符串的尾部，返回布尔值

  ```js
   let str = 'Hello world!';
   str.startsWith('Hello') // true 
   str.endsWith('!')       // true
  ```

  



- `repeat()`

  repeat方法表示将原字符串重复n次，返回一个新字符串

  ```js
  let name = 'h';
  console.log(name.repeat(3)); //hhh
  ```

  



### 9 集合——`Set数据结构`

`ES6`提供了新的数据结构`Set`,即集合,它类似于数组,但是成员的值都是**唯一**的,没有重复的值.

- 实例化

  `Set`本身也是一个构造函数,用来生成`Set`数据结构

  ```js
  const s = new Set();
  ```

  `Set`函数可以接受一个数组作为参数,用来初始化,会去掉数组中重复的值.

  ```js
  const s = new Set([1,2,3,4,4]); // [1,2,3,4]
  ```

- 实例方法

  - `add(value)`:添加某个值,返回集合本身;
  - `delete(value)`:删除某个值,返回一个布尔值,表示删除是否成功;
  - `has(value)`:返回一个布尔值,表示该值是否为`Set`的成员;
  - `clear()`:清除所有成员,没有返回值

  ```js
  const s = new Set([1,2,3,4]);
  s.add(4).add(5);
  console.log(s); // Set(5) {1,2,3,4,5}
  console.log(s.delete(4)); // true
  console.log(s.has(4)); // false
  s.clear();
  console.log(s); // Set(0) {}
  ```

  - 遍历方法`forEach`

    `Set`结构的实例与数组一样,拥有`forEach`方法,用于对每个成员执行某种操作,没有返回值;

    ```js
    s.forEach((value, index, set) => console.log(value, index, set));
    ```

    其中回调函数里第一个参数是当前值,第二个是索引(从1开始),第三个是集合本身.

### 10 `Promise`