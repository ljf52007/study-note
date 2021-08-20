`this`的优先级如下

- 对于`const c = new Fn()`来说,`this`被永远绑定在了`c`上面,不会被任何方式改变`this`;

- 对于`bind`,`apply`,`call`来说,`this`取决于第一个参数,如果第一个参数为空,那么就是`window`;

  - 如果对一个函数进行多次`bind`,如

    ```js
    let a = {};
    let fn = function () {
    	console.log(this);
    }
    fn.bind().bind(a)(); // window
    ```

    不管我们给函数`bind`多少次,`fn`中的`this`永远由第一次`bind`决定.

- 对于`obj.fn()`来说,谁调用了函数,谁就是`this`;

- 对于直接调用函数,不管函数被放在了什么地方,`this`一定是`window`;

- 对于箭头函数来说,箭头函数不绑定`this`,箭头函数中的`this`只取决于包裹箭头函数的第一个普通函数的`this`.同时,箭头函数的`this`一旦被绑定,就不会再被任何方式所改变.