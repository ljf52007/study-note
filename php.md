# PHP

## 网站分类

### 静态网站

全部由HTML代码格式页面组成的网站，没有数据库的支持，在网站制作和维护方面工作量大。

### 动态网站

动态网站并不是指具有与动画功能的网站，而是指网站内容可根据不同情况动态变更的网站。一般情况下动态网站通过**数据库**进行架构。一般动态网站体现在网页一般是以 asp，jsp，php，aspx 等结尾，动态网页以数据库技术为基础，可以大大降低网站维护的工作量，维护方便。 



## PHP基础语法

### 语法基本结构

1. **所有的php代码都要写到<?php...?>里面**

   ```php
   <?php
   	echo "Hello World!"    
   ?>
   ```

   

2. **php文件可以和HTML相互结合进行使用**

   - 如在php文件中：

   ```php
   echo "<h1>Hello PHP</h1>";//echo就是往浏览器输出一个字符串
   ```

   - 或在html文件中：（注意这里文件依然需要是.php文件）

   ```html
   <div><?php echo "HelloWorld PHP"?></div>
   ```

   

3. **php文件的默认文件扩展名是".php"**

4. **php代码必须在服务器上运行**

   如果我们直接双击打开.php文件，那么页面显示的依然是php代码，而不会进行代码解析。这和php的执行原理有关。

5. **设置字符的编码格式，防止中文乱码：**

   ```php
   header("content-Type: text/html; charset=Utf-8"); //设置字符的编码是utp-8
   ```

   

### 输出方式

- echo就是往**浏览器**输出一个字符串

- print_r() 输出复杂类型

- var_dump() 输出复杂类型

- json_encode() 将结果转换为json格式的字符串

  ```php
  echo json_encode($arr);//将数组转换为json格式的字符串，这行代码相当于下面两行
  $result = json_encode($arr);
  echo $result;
  ```



### 变量声明

无论是变量的声明还是变量的使用，都要加上$符号



### 字符串的拼接

与JavaScript不同，php中字符串的拼接不可以用+，而是需要用 . 进行连接。

```php
$str1 = "hi ";
$str2 = "hello";
$str3  = $str1 . $str2;//字符串的拼接
echo "字符串的拼接结果为：".$str3;
```



### php执行原理

前面说过.php文件必须在服务器上运行，否则浏览器不识别php代码。

![php执行原理](./images\php\php执行原理.png)

## 数组

### 数组定义方式

第一种：

```php
$arr = array();
$arr[0] = "zhangsan";
$arr[1] = "lisi";
$arr[2] = "wangwu";
```
第二种：

```php
$arr = array("zhangsan","lisi","wangwu");
```

### 数组输出

1. echo不能直接输出一个数组，因为数组属于字符串，但是echo可以输出单独的数组元素：

```php
echo $arr[0];
echo $arr[1];
echo $arr[2];
```

2. print_r() 和 var_dump() 可以直接输出数组：

```php 
print_r($arr);
var_dump($arr);
```

3. json_encode() 将数组转化为json格式的字符串：

```php
echo json_encode($arr);//将数组转换为json格式的字符串
$result = json_encode($arr);
echo $result;
```
### 自定义索引

在php中，数组的索引是可以自定义的，通过key=>value定义：

```php
$arr = array("name1"=>"zhangsan","lisi","wangwu");
```

若某几个元素的索引被自定义了，那么剩下的元素按顺序从0开始计算索引，如上例代码中 "zhangsan" 的索引被自定为了 "name1"，此时后面两个元素索引分别为0和1；

```php
$arr = array("zhangsan","name1"=>"lisi","wangwu");
```

而这里的 "lisi" 索引被修改，则剩下的 "zhangsan" 索引为0，"wangwu" 索引为1。

### 二维数组

```php
$arr1 = array();
$arr1["zhangsan"] = array("age"=>19,"sex"=>"male","height"=>190);
$arr1["lisi"] = array("age"=>18,"sex"=>"female","height"=>160);
$arr1["wangwu"] = array("age"=>15,"sex"=>"male","height"=>170);
```
### 数组遍历

1. 没有自定义索引时：

   ```php
   $arr = array("zhangsan","lisi","wangwu");
   for($i=0;$i<count($arr);$i++){
   	$temp = $arr[$i];
   	echo $temp."<br/>";
   }
   ```
   
2. 由上面自定义索引我们知道，如果一个数组中有元素的索引被自定义了，那么通过 $i 来遍历数组肯定是行不通的，因此php中有一个**更为普遍的遍历方式**：
   
   ```php
   $arr = array("name1"=>"zhangsan","name2"=>"lisi","name3"=>"wangwu");
   foreach($arr as $key => $value){
       echo $key.">>>".$value."<br/>";
   }
   ```



## PHP中的函数

### 系统函数

- print_r 输出复杂的数据类型
- var_dump 输出复杂的数据类型
- json_encode 中将数组转化为json格式的字符串
- count 得到数组的长度

### 自定义函数

php中定义函数的方式和JavaScript类似，以function进行声明：

```php
function add($num1,$num2){
	return $num1+$num2;
}
$addResult = add(2,3);
echo "计算结果为：".$addResult;
```



## 预定义变量

### 请求类型

请求有时候是需要携带参数的，用来标识特定的要求，根据参数携带位置的不同可以简单地把请求分为**Get请求**和**Post请求**：

- Get请求：参数在url后面，多个参数用&进行连接；
- Post请求：参数在请求体中。

### 获取请求参数的值

1. $_GET[]
2. $_POST[]

### 案例：由考号查询学生成绩

- .html：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>查询学生的成绩</title>
</head>
<body>
	<h1>请在下列输入框中输入学生的考号进行查询：</h1>
	<form action="result.php" method="post">
		输入考号:<input type="text" name="code"><br>
		<input type="submit" value="查询">
	</form>
</body>
</html>
```

在form表单中，action标识.php文件，method标识请求类型。

- .php：

```php
<!-- 根据学生的考号查询数据库，得到数据之后进行返回 -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>学生成绩结果</title>
	<style>
		ul{
			list-style: none;
			color: red;
		}
		.title{
			font-size: 20px;
		}
	</style>
</head>
<body>
	<?php 
		//准备模拟数据，注意的是，按道理数据应该是从数据库获取的，这里进行简单的处理
		$data = array();
		$data["123"] = array("name"=>"张三","chinese"=>"103","math"=>"89","english"=>"143");
		$data["234"] = array("name"=>"李四","chinese"=>"123","math"=>"69","english"=>"43");
		$data["345"] = array("name"=>"王五","chinese"=>"83","math"=>"129","english"=>"63");

		$code = $_POST["code"];
		//$code = $_GET["code"];
		//查询数据库
	 ?>

 	<?php 
 	if(array_key_exists($code, $data)){
 		$result = $data[$code];
 	?>
	<div>
		<div class="title"><?php echo $result["name"] ?>成绩如下</div>
		<ul>
			<li>语文：<?php echo $result["chinese"] ?>分</li>
			<li>数学：<?php echo $result["math"] ?>分</li>
			<li>英语：<?php echo $result["english"] ?>分</li>
		</ul>
	</div>

	<?php 
	} else {
	?>
		<div>该学生考号不存在</div>

	<?php
	} 
	?>
	
</body>
</html>
```

在php中，用

```php
$code = $_POST["code"];
//$code = $_GET["code"];
```

获取了请求参数的值。

**注意，在上例代码中还有一个细节：**

我们是将输出结果的div块代码作为if条件满足的执行代码的，即div那段代码实际上是包含在if条件的花括号内的，只不过我们巧妙地用<?php?>将if右边的括号以及else块包裹了。