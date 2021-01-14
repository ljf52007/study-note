## web存储

### Cookie

### 浏览器存储

我们常用 document.cookie 来进行数据的存储，但是 cookie 的存储大小只有4k左右，并且解析相当复杂，给开发带来诸多不便。HTML5规范提出了新的存储方式：**window.sessionStorage 和 window.localStorage**

| sessionStorage（临时保存）                                   | localStorage（永久保存）                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| sessionStorage 存储容量为5mb左右                             | localStorage 存储的容量有20mb左右                            |
| 数据本质是存储在当前页面的内存中，这就说明其他浏览器甚至同个浏览器同个网址不同窗口都不能获取到该数据 | 不同浏览器不能共享数据，但是同个浏览器不同窗口可以共享数据   |
| sessionStorage 的生命周期在页面关闭时结束，即关闭页面时数据会自动清除 | 数据永久存储在硬盘上，并不会随着页面或者浏览器的关闭而清除，如果想清除，必须手动清除 |

- 不管是sessionStorage还是localStorage，都是将数据存储在浏览器中，因此不同的浏览器当然不能共享数据

- sessionStorage 和 localStorage 都包含四个重要的方法：

  | 方法                | 说明                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | setItem(key, value) | 以键值对的方式存储数据                                       |
  | getItem(key)        | 通过指定的key获取对应的value值；如果找不到对应名称的key,那么就会获取null |
  | removeItem(key)     | 通过指定的key删除对应的数据；在删除的时候如果key值错误，不会报错，但是也不会删除数据 |
  | clear()             | 清空所有存储的内容                                           |


  可通过下面的案例感受一下两种存储的区别的：在浏览器页面按F12查看存储，例如在Firefox中可查看“存储”-“会话存储”和“本地存储”。


```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>demo</title>
	</head>
	<body>
		请输入数据，进行sessionStorage存储：<input type="text" id="data1" /><br/>
		<input type="button" id="set_data1" value="存储数据" />
		<input type="button" id="get_data1" value="获取数据" />
		<input type="button" id="del_data1" value="删除数据" /><br/>
		请输入数据，进行localStorage存储：<input type="text" id="data2" /><br/>
		<input type="button" id="set_data2" value="存储数据" />
		<input type="button" id="get_data2" value="获取数据" />
		<input type="button" id="del_data2" value="删除数据" />
		<script>
			//sessionStorage 存储
			document.querySelector("#set_data1").onclick = function(){
				var data = document.querySelector("#data1").value;
				window.sessionStorage.setItem("username",data);
			}
			document.querySelector("#get_data1").onclick = function(){
				alert(window.sessionStorage.getItem("username"));
			}
			document.querySelector("#del_data1").onclick = function(){
				window.sessionStorage.removeItem("username");
			}
            //localStorage 存储
            document.querySelector("#set_data2").onclick = function(){
                var data = document.querySelector("#data2").value;
                window.localStorage.setItem("username",data);
            }
            document.querySelector("#get_data2").onclick = function(){
                alert(window.localStorage.getItem("username"));
            }
            document.querySelector("#del_data2").onclick = function(){
                window.localStorage.removeItem("username");
            }
		</script>
	</body>
</html>
```


## 应用缓存

在HTML5中，通过创建 **cache manifest** 文件，可创建web应用的离线版本。它的优势在于**可配置需要缓存的资源，而不是整个页面**。

### Cache Manifest基础：

1. 如果需要用到应用程序缓存，要在<html>标签中添加 manifest 属性，指定应用程序缓存清单文件的路径：

```html
<html manifest="dongman.appcache">
```

2. 每个指定了 manifest 的页面在用户对其访问时都会被缓存。如果未指定 manifest 属性，则页面不会被缓存（除非在 manifest 文件中直接指定了该页面）。

3. 由上面我们可以看到应用程序缓存清单文件的后缀名为.appcache，实际上这是HTML5建议的。

### Manifest文件：

Manifest 文件的本质就是一个文本文件，但它不是一个简单的文本文件，它告知了浏览器被缓存的内容和不缓存的内容。

**Manifest 文件可分以下几个部分：**

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| CACHE MANIFEST | 文件的开始，必须以 CACHE MANIFEST 这句话作为开始，就算是注释也要放在它的下面 |
| CACHE          | 在此标题下列出的文件将在首次下载后进行缓存                   |
| NETWORK        | 在此标题下列出的文件需要与服务器进行连接，不会被缓存         |
| FALLBACK       | 在此标题下列出的文件规定当页面无法访问时的回退页（如404页面） |


当然了，CACHE、NETWORK、FALLBACK 没有顺序和数量的限制。

下面看一个例子，实现效果为缓存前两张图，第三张图修改了本地名字，使其获取不到，并通过FALLBACK找到404.jpg。第四张图不缓存。以下为appcache文件内容：

```appcache
CACHE MANIFEST
#上面这句话必须写第一行，注释在它下面

#需要缓存的文件清单列表

*：代表缓存所有文件

CACHE:
1.jpg
2.jpeg

#配置每一次都需要重新从服务器获取的文件清单列表
NETWORK:
4.jpg

#配置如果文件无法获取则使用指定的文件进行替代
FALLBACK:
/ 404.jpg
```

