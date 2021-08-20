`window`是浏览器对象模型`(BOM)`的顶级对象.它的主要对象有:

- `document`对象

  

- `frames`对象

  `window.frames`是一个类数组,类数组中每一项都代表了窗口对应给定对象的`<frame>`或`<iframe>`的内容.

  

- `history`对象

  `history`接口是`html5`新增的,它有五种模式改变`URL`而不刷新页面

  1. `history.pushState()`

     ```js
     history.pushState({},'','/foo')
     ```

     

  2. `history.replaceState()`

     ```js
     history.replaceState({},'','/foo/bar')
     ```

     

  3. `history.go()`

     ```js
     history.go(-1) // 后退一个页面
     history.go(1) // 前进一个页面
     ```

     

  4. `history.back()`

     等价于`history.go(-1)`

     

  5. `history.forward()`

     等价于`history.go(1)`

  

- `location`对象

  `location`对象用于获取或设置窗体的`URL`,并且可以用于解析`URL`.

  - 属性

    | `location`对象属性  | 返回值                           |
    | ------------------- | -------------------------------- |
    | `location.href`     | 获取或设置整个`URL`              |
    | `loaction.host`     | 返回主机`/`域名                  |
    | `location.port`     | 返回端口号，如果未写返回空字符串 |
    | `location.pathname` | 返回路径                         |
    | `location.search`   | 返回参数                         |
    | `location.hash`     | 返回片段`#`后面的内容            |

  - 方法

    | location对象方法     | 返回值                                                       |
    | -------------------- | ------------------------------------------------------------ |
    | `location.assign()`  | 和`href`一样，可以跳转页面（也称为重定向页面），有历史记录，可以返回和前进 |
    | `location.replace()` | 替换当前页面，没有历史记录，不能返回和前进                   |
    | `location.reload()`  | 刷新页面，可带参数`false`或`true`，默认为`false`，表示刷新，相当于`F5`；`true`表示强制刷新，相当于`Ctrl+F5` |

  

- `navigator`对象

  `navigator`对象包含有关浏览器的信息,它有很多属性,我们最常用的是`userAgent`,该属性可以返回由客户机发送服务器的`user-agent`头部的值.

  下面代码可以判断用户用哪个终端打开页面,实现跳转:

  ```js
  if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      window.location.href = "";     //手机
   } else {
      window.location.href = "";     //电脑
   }
  
  ```

  

- `screen`对象