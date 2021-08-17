`Web`中常见的安全问题有

- `SQL`注入
- `XSS`
- `CSRF`
- 点击劫持

## 1 `SQL`注入

- 原理:就是通过把`SQL`命令插入到`Web`表单递交或输入域名或页面请求的查询字符串,最终达到欺骗服务器执行恶意的`SQL`命令
- 防御:
  1. 对用户的输入进行校验,如通过正则表达式进行限制;
  2. 避免动态拼装`SQL`,可以使用参数化的`SQL`或者直接使用存储过程进行数据查询存取;
  3. 避免使用管理员权限的数据库连接,为每个应用使用单独的权限有限的数据库连接;
  4. 避免把机密信息明文存放;

## 2 `XSS`

`XSS`即跨域脚本攻击`(cross-site scripting)`,是一种网站应用程式的安全漏洞攻击,是代码注入的一种.

- 原理: 不需要做任何登录认证,攻击者通过合法的操作(如在`url`或评论框中输入),往`web`页面插入恶意的`html`标签或`JavaScript`代码.例如

  ```html
  <!-- 页面的url: http://www.domain.com?name=<script>alert(1)</script> -->
  <div>{{name}}</div>    
  ```

  攻击者可能可以通过改变`url`将`html`修改为

  ```html
   <div><script>alert(1)</script></div>
  ```

  这样页面就凭空多出一段可执行脚本.

- 防御:

  1. `encode`:最普遍的做法是转义输入输出的内容,对于引号,尖括号,斜杠等进行转义

     ```js
     function escape(str) {
     	str = str.replace(/&/g, "&amp;");
     	str = str.replace(/</g, "&lt;");
     	str = str.replace(/>/g, "&gt;");
     	str = str.replace(/"/g, "&quto;");
     	str = str.replace(/'/g, "&##39;");
     	str = str.replace(/`/g, "&##96;");
         str = str.replace(/\//g, "&##x2F;");
         return str
     }
     ```

     如果是富文本,就设置白名单.

  2. 过滤:

     移除用户输入的和事件相关的属性.如`onerror`可以自动触发攻击,还有`onclick`等.

     移除用户输入的`style`,`script`,`iframe`节点,尤其是`script`节点,它是支持跨域的,一定要移除.

     (总而言之,过滤掉一些不安全的内容)

## 3 `CSRF`

`CSRF`即跨站请求伪造`(cross-site request forgery)`

- 原理:

  ![17](https://gitee.com/ljf52007/note/raw/master/interview/interview_Q/Http_Q.assets/17.png)

  从上图可以看出,要完成一次`CSRF`攻击,受害者必须满足两个必要的条件:

  1. 登录受信任网站`A`,并在本地生成`cookie`.(如果用户没有登录网站`A`,那么网站`B`在请求网站`A`的接口时,会诱导用户登录`A`)
  2. 在不登出`A`的情况下,访问危险网站`B`.(其实是利用了网站`A`的漏洞)

- 防御:

  1. `Token`验证:(最常用)

     - 服务器发送给客户端一个`Token`
     - 客户端提交的表单中带着这个`Token`
     - 如果这个`Token`不合法,服务器就拒绝这个请求

  2. 隐藏令牌:

     把`Token`隐藏在`Http`的`Head`头中.隐藏令牌和`Token`验证有点像,本质上没有太大区别,只是使用方式上有区别.

  3. `Referer`验证:

     `Referer`指的是页面请求来源.意思是,`只接受本站的请求,服务器才做响应`.如果不是,就拦截.



> `XSS`和`CSRF`的区别
>
> 区别一:
>
> - `XSS`不需要登录
> - `CSRF`需要用户先登录网站`A`,获取`cookie`
>
> 区别二:
>
> - `XSS`是向网站`A`注入`JS`代码并执行,篡改网站`A`的内容
> - `CSRF`是利用网站`A`本身的漏洞,去请求网站`A`的接口

## 4 点击劫持

- 原理:

  点击劫持是一种视觉欺骗的攻击手段.攻击者将需要攻击的网站通过`iframe`嵌套的方式嵌入自己的网页中,并将`iframe`设置为透明,在页面中透出一个按钮诱导用户点击.

  ![image.png](https://poetries1.gitee.io/img-repo/2020/07/5.png)

- 防御:

  1. `X-FRAME-OPTIONS`

     `X-FRAME-OPTIONS`是一个`Http`响应头,这个响应头就是为了防御用`iframe`嵌套的点击 劫持攻击.

     `X-FRAME-OPTIONS`有三个值可选,分别是

     - `DENY`,表示页面不允许通过`iframe`的方式展示
     - `SAMEORIGIN`,表示页面可以在相同域名下通过`iframe`的方式展示
     - `ALLOW-FROM`,表示页面可以在指定来源的`iframe`中展示

  2. `JS`防御

     对于不兼容`X-FRAME-OPTIONS`的浏览器,只能通过`JS`的方式来防御点击劫持

     ```html
     <head>
       <style id="click-jack">
         html {
           display: none !important;
         }
       </style>
     </head>
     <body>
       <script>
         if (self == top) {
           var style = document.getElementById('click-jack')
           document.body.removeChild(style)
         } else {
           top.location = self.location
         }
       </script>
     </body>
     ```

     以上代码的作用就是当通过`iframe`的方式加载页面时,攻击者的网页直接不显示所有内容了



## 5 网页验证码

另外,为了区分用户是计算机还是全自动程序,通过网页验证码来防止恶意破解密码,刷票,论坛灌水等.

网页验证码能有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登录尝试.