# Ajax

## 一、基本信息

1. Ajax的全称：Asynchronous JavaScript And XML，就是**JS代码获取服务器数据**
2. Ajax的作用：获取服务器的数据
3. Ajax的效果：在不刷新整个页面的情况下，通过一个url地址获取服务器的数据，然后进行页面的局部刷新

## 二、Ajax的使用

Ajax简单的来说，就是一个异步的JavaScript请求，用来获取后台服务端的数据，而并不是整个界面进行跳转。

在元素JS中来实现Ajax主要的类就是**XMLHttpRequest**，它的使用一般有四个步骤：

1. 创建 XMLHttpRequest 对象；
2. 准备发送网络请求；
3. 开始发送网络请求；
4. 指定回调函数。

### 2.1 Ajax使用四个步骤

#### （1）创建XMLHttpRequest对象

在IE6及以下版本，不支持XMLHttpRequest，因此最好做一个兼容处理：

```javascript
var xhr = null;
if(window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();//使用new关键字实例化一个XMLHttpRequest对象
} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```
#### （2）准备发送网络请求

```javascript
xhr.open(requestType, url, flag);
```

在准备发送的步骤中，调用open方法，这里面有**三个参数**：

1. 第一个参数代表HTTP请求类型，即get或post；

2. 第二个参数是这个HTTP请求的url地址，这个url地址后面是否需要添加"?参数="，取决于请求类型是get还是post；

3. 第三个参数代表这个HTTP请求是同步或异步，false代表同步，true代表异步。

- **如当请求类型为get、异步发送时：**

```JavaScript
xhr.open("get","./server/checkUsername.php?uname=" + usernameValue,true);
```

其中uname是参数，usernameValue是我们获取的表单值。

- **当请求类型为post、异步发送时：**

```JavaScript
xhr.open("post","./server/checkEmail.php",true);
```

#### （3）执行发送

```javascript
xhr.send()
```

- 当请求类型为get时：

  ```javascript
  xhr.send(null);
  ```

  因为此时参数已经包含在url地址中，所以send中不必传入参数；

- 当请求类型为post时：

  ```javascript
  var param = "e=" + emailValue;
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//请求头
  xhr.send(param);
  ```
  此时url地址中是没有参数的，因此我们需要将参数传入send方法。

  需要注意的是，当请求类型为post时，执行发送需要添加**请求头**，即下面这行代码：

  ```JavaScript
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ```

#### （4）指定回调函数

```JavaScript
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4) {
		if(xhr.status == 200) {
			var result = xhr.responseText;
			var username_result = document.querySelector("#username_result");
			if(result == "ok") {
				username_result.innerText = "用户名可以使用";
			} else {
				username_result.innerText = "用户名已经被注册";
			}
		}
	}
};
```

上述代码中的4和200代表正常得到数据，服务器响应正常，那么这时候我们就可以通过

```javascript
xhr.responseText
```

来获取到服务器给我们返回的数据了。

- **readyState的常用值代表含义：**

| readyState的常用值 | 代表含义                         |
| ------------------ | -------------------------------- |
| xhr.readyState = 0 | 表示xhr对象创建完成              |
| xhr.readyState = 1 | 表示已经发送了请求               |
| xhr.readyState = 2 | 浏览器已经收到了服务器相应的数据 |
| xhr.readyState = 3 | 正在解析数据                     |
| xhr.readyState = 4 | 数据已经解析完成，可以使用了     |

- **xhr.status的常用值代表含义**

| status的常用值   | 代表含义                     |
| ---------------- | ---------------------------- |
| xhr.status = 200 | 表示响应成功                 |
| xhr.status = 304 | 表示未修改，可以使用缓存数据 |
| xhr.status = 404 | 没有找到请求的资源           |
| xhr.status = 500 | 服务器端错误                 |



### 2.2 接口文档

当前端界面需要从服务器获取数据时，其实就只要访问一个url地址，指定特定的参数即可。

这个url地址所对应的**jsp**也好，**php**也好，其实服务器开发人员已经开发好了。服务器开发人员开发好相关的接口之后，会提供一份接口文档，在接口文档中会详细的说明你要获取什么数据，访问什么地址，传入什么参数等等。

下面就是几个简单接口文档中的内容：

![验证用户名唯一性的接口](./images\ajax\验证用户名唯一性的接口.jpg)

![验证邮箱唯一性的接口](./images\ajax\验证邮箱唯一性的接口.jpg)

![验证手机号的接口](./images\ajax\验证手机号的接口.jpg)



### 2.3 ajax中的同步和异步

在ajax使用步骤的第二步中，我们调用了方法open：

```
xhr.open();
```

在open方法中，第三个参数代表这个HTTP请求是**同步**或**异步**，**false代表同步，true代表异步。**

在上面的例子中，我们在php文件中添加sleep方法来模拟网络延迟：

```php
sleep(5);
```



- **若我们将请求改为同步请求，如：**

  ```javascript
  xhr.open("get","./server/checkUsername.php?uname=" + usernameValue,false);
  xhr.send(null);
  ```

  这样做的话，会有两个问题：

  1. 界面会卡顿，卡顿多长时间取决于网络速度（由于我们用sleep方法模拟了网络延迟，因此会卡顿5s）：

     这是由于xhr.send() 需要时间，在同步请求中，只有当send() 函数执行完毕后，才会执行后面的代码。

  2. xhr.onreadystatechange 的回调不会被执行，这是由于在同步请求中，send() 方法执行完毕后，xhr.readyState 已经等于4了，因此没有change这一说，则回调不会被执行。因此，我们需要对代码做出如下修改：

     ```JavaScript
     xhr.open("get","./server/checkUsername.php?uname="+usernameValue,false);
     // 3.执行发送
     xhr.send(null);
     // 4.制定回调函数
     if(xhr.readyState == 4){
     	if(xhr.status == 200){
     		var result = xhr.responseText;
     		var username_result = document.getElementById("username_result");
     		if(result == "ok"){
     			username_result.innerText = "用户名可以使用";
     		} else {
     			username_result.innerText = "用户名已经被注册";
     		}
     	}
     }
     ```
     即直接把onreadystatechange的回调函数内的代码写在外面。

- 若请求类型为异步请求，则会出现以下情况：

  由于我们用sleep方法模拟了网络延迟，因此界面会等待五秒后才出现验证的结果，但是界面不会卡顿。



## 三、数据格式

### 3.1 什么是数据格式

将数据通过一定的规范组织起来，叫做数据格式，例如：

```
张三%11%男-李四%12%男-小红%18%女
```

这就是我们自定义的一种数据格式，但是一般我们自定义的数据格式组成的规则不通用。

### 3.2 XML数据格式（了解）

XML数据格式是：

1. 将数据以标签的方式进行组装；

2. 必须以

   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   ```

   作为开头；

3. 标签必须成对出现；

xml是一个通用的标准，任何人都知道该如何解析它，例如：

```xml
<?xml version="1.0" encoding="utf-8" ?>
<students>
	<student>
		<name>张三</name>
		<age>11</age>
		<sex>男</sex>
	</student>
	<student>
		<name>李四</name>
		<age>12</age>
		<sex>男</sex>
	</student>
	<student>
		<name>小红</name>
		<age>18</age>
		<sex>女</sex>
	</student>
</students>
```

缺点：体积太大，传输慢，元数据太多，解析不方便，目前使用的很少。



### 3.3 JSON数据格式（常用）

Json数据格式类似于js中的对象方式，通过key-value 的形式组装，是一个通用的标准，任何人都知道如何解析它。

```json
{
	"student":[
		{
			"name":"张三",
			"age":"11",
			"sex":"男"
		}
		{
			"name":"李四",
			"age":"12",
			"sex":"男"
		}
		{
			"name":"小红",
			"age":"18",
			"sex":"女"
		}
	]
}
```

优点：体积小，传输快，解析方便。

#### 案例：学生信息展示

.html：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			div{
				width: 800px;
				margin: 20px auto;
			}
			table{
				width: 800px;
				margin: 20px auto;
				border-collapse: collapse;
			}
			th{
				background-color: #0094ff;
				color:white;
				font-size: 16px;
				padding: 5px;
				text-align: center;
				border: 1px solid black;
			}
			td{
				padding: 5px;
				text-align: center;
				border: 1px solid black;
			}
		</style>
		<script>
			window.onload = function(){
                //1. 创建XMLHttpRequest对象
				var xhr = new XMLHttpRequest();
                //2. 准备发送
				xhr.open("get","./server/getStudents.php",true);
                //3. 开始发送
				xhr.send(null);
                //4. 回调函数
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if(xhr.status == 200){
                            //获取输出内容
							var result = xhr.responseText;
                            //将内容转换为对象格式
							result = JSON.parse(result);
							
							var name,age,sex;
							var TabContainer = document.querySelector("#container");
                            //将页面内容存储在newTemp中
							var newTemp = TabContainer.innerHTML;
                            //遍历对象
							for(var i=0;i<result.length;i++){
								var item = result[i];
								name = item.name;
								age = item.age;
								sex = item.sex;
								//将页面新增内容存在变量tempHtml中
								var tempHtml = "<tr><td>"+name+"</td><td>"+age+"</td><td>"+sex+"</td></tr>";
                                //将页面内容进行累加
								newTemp += tempHtml;
							}
							TabContainer.innerHTML = newTemp;
						}
					}
				};
			};
		</script>
	</head>
	<body>
		<div>
			<table id="container">
				<tr>
					<th>姓名</th>
					<th>年龄</th>
					<th>性别</th>
				
			</table>
		</div>
	</body>
</html>

```

php：

```php
<?php 
    $arr = array();
    $arr[0] = array("name"=>"张三","age"=>"19","sex"=>"男");
    $arr[1] = array("name"=>"李四","age"=>"23","sex"=>"男");
    $arr[2] = array("name"=>"王五","age"=>"30","sex"=>"女");
	
	//输出
    echo json_encode($arr);
 ?>

```



## 四、ajax的封装



## 五、跨域

### 同源策略

**同源策略**是浏览器上为安全性考虑实施的非常重要的安全机制。

Ajax默认是可以获取到同源的数据，但是对于非同源的数据，ajax默认是获取不到的。

**所谓的同源就是协议、端口、域名三者都完全一样**，见以下例子：

比如现在有一个页面，它的url为：

```
http://www.example.com/dir/page.html
```

在这个网址中，要去获取服务器的数据，获取数据的地址如下所示：

| URL                                       | 结果   | 原因                   |
| ----------------------------------------- | ------ | ---------------------- |
| https://www.example.com/dir/other.html    | 不同源 | 协议不同，http和https  |
| http://en.example.com/dir/other.html      | 不同源 | 域名不同               |
| https://www.example.com:81/dir/other.html | 不同源 | 端口不同，80和81       |
| http://www.example.com/dir/page2.html     | 同源   | 协议，域名，端口都相同 |
| https://www.example.com/dir2/other.html   | 同源   | 协议，域名，端口都相同 |



### 跨域的必要性

前端界面访问非同源的服务器这种需求是非常常见的，比如在前端界面中获取天气数据，但天气数据是存储在中国天气网数据库中的，因此我们必须访问非同源的服务器。这就需要使用到**跨域**的技术了。

Ajax是为了访问自己服务器的数据，跨域是为了访问别人服务器的数据。



### 跨域的实现——script标签引入外部文件

#### 引入外部js文件

跨域的实现就是通过 script 标签的 src 属性引入一个外部的文件，这个外部文件是不涉及同源策略的影响的。

例如，我们在域名为 www.zhangsan.com 的目录下创建一个html文件，在域名为 www.lisi.com 的目录下创建一个 test.js 文件，

在 test.js 中添加以下代码：

```javascript
fn('haha');
```

在html 中引用这个 test.js 文件：

```html
<script>
	function fn(data){
		console.log(data);
	}
</script>
<script src="http://www.lisi.com/test.js"></script>
```

页面可正常输出"haha"。

#### 引入外部php文件

同样的，我们可以引入一个php文件：

```html
<script>
	function fn(data){
		console.log(data);
	}
</script>
<script src="http://www.lisi.com/test.php"></script>
```

在 test.php 中添加如下代码：

```php
<?php
	echo "fn('haha')";
?>
```

可以认为 test.php 也返回了一段 js 代码，因此 html 可以正常调用，页面正常输出"haha"。

由此我们可以实现php的传参：

```html
<script>
	function fn(data){
		console.log(data);
	}
</script>
<script src="http://www.lisi.com/test.php?good=java"></script>
```

test.php:

```php
<?php
	// echo "fn('haha')";
	$good = $_GET['good'];
	if($good == 'java'){
		echo "fn('java教程')";
	} else {
		echo "fn('未查询到此商品')";
	}
?>
```

页面输出结果为"java教程"，当把参数值改为其他时，页面输出"未查询到此商品"。



### 动态创建script标签

假如我有一个需求，要实现用户输入的值为参数 good 的值，这就不能将引入的外部 php 文件的url 写死，而需要我们动态创建script标签：

```javascript
//动态创建script标签
var script = document.createElement("script");
script.src = "http://www.lisi.com/test.php?good="+keyValue;
// 将script标签加入head
var head = document.querySelector("head");
head.appendChild(script);
```

### 给window添加属性进行方法定义

我们来看一段代码：

```javascript
window['fn'] = function(data){
	console.log(data);
};
```

它等价于：

```javascript
function fn(data){
	console.log(data);
}
```



### 动态指定回调函数名称

我们可以在php的url地址中再添加一个参数callback，用来动态的指定回调函数的名称，即：

```javascript
script.src = "http://www.lisi.com/test.php?good="+keyValue+"&callback=fn";
```

这样php中的代码则可以改为：

```php
<?php
	// echo "fn('haha')";
	$good = $_GET['good'];
	$callback = $_GET['callback'];
	if($good == 'java'){
		echo $callback."('java教程')";
	} else {
		echo $callback."('未查询到此商品')";
	}
?>
```

html代码为：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- <script>
			function fn(data){
				console.log(data);
			}
		</script> -->
		<!-- <script src="http://www.lisi.com/test.php?good=java"></script> -->
		<script>
			window.onload = function(){
				var txt = document.querySelector("#txt");
				var btn = document.querySelector("#btn");
				btn.onclick = function(){
					keyValue = txt.value;
					//动态创建script标签
					var script = document.createElement("script");
					script.src = "http://www.lisi.com/test.php?good="+keyValue+"&callback=fn";
					//为window添加属性fn,属性值为一个函数
					window['fn'] = function(data){
						console.log(data);
					};
					// 将script标签加入head
					var head = document.querySelector("head");
					head.appendChild(script);
				};
			};
		</script>
	</head>
	<body>
		<input type="text" id="txt" placeholder="请输入商品名称">
		<button type="button" id="btn" >查询</button>
	</body>
</html>
```



### 案例分析——百度提示词








