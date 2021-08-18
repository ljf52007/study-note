## `background-color`

添加背景色



## `background-image`

如果图片大于容器，默认图片从容器左上角原大小放置；

如果图片小于容器，默认图片原大小平铺

```css
background-image: url("abc.jpg");
```



## `background-repeat`

设置背景**平铺**的方式：

- `round`：将图片进行缩小后平铺

- `space`：将图片间距放大后平铺

```css
background-repeat：round;
```

## `background-attachment`

**滚动页面时：**

`fixed`：背景图片的位置固定不变

`scroll`：背景也会跟着滚动

**滚动背景容器上的内容时：**

`fixed`：背景图片不会跟随内容一起滚动

`scroll`：背景图片不会跟随内容一起滚动

`local`：背景图片会跟随内容一起滚动



## `background-size`

设置背景图片的大小：

`100px 100px`：设置宽度为`100px`，高度为`100px`；

`100px auto`：设置宽度为`100px`，高度等比例自适应；

`50% 50%`：设置百分比，参照父容器的内容区域宽高；



## `background-size: contain`

使容器包含背景图片，即背景图片需要完全在容器内显示出来，因此往往造成容器有空白区域，有两种情况：

1. 当背景图片比容器大时，图片会被等比例缩小；
2. 当背景图片比容器小时，图片会被等比例放大；



## `background-size: cover`

使背景图片覆盖整个容器，即整个容器不能有空白区域，因此往往造成图片溢出，有两种情况：

1. 当背景图片比容器大时，背景图片会被等比例缩小，填满整个容器；
2. 当背景图片比容器小时，背景图片会被等比例放大，填满整个容器；



## `background-positon`

设置背景的位置偏移，默认是以左上角作为原点，原点可通过`background-origin`改变



## `background-origin`

设置背景坐标的原点：

1. `border-box`:从`border`的位置开始填充背景，会与`border`重叠
2. `padding-box`:从`padding`的位置开始填充背景，会与`padding`重叠
3. `content-box`:从内容的位置开始填充背景



## `background-clip`

设置显示的内容：

1. `border-box`:其实是显示`border`及以内的内容
2. `padding-box`:其实是显示`padding`及以内的内容
3. `content-box`:其实是显示`content`及以内的内容



## `background-position` 案例

`background-position`的用法很实用，比如之前我做一个轮播图的左右切换按钮：

![轮播按钮](https://gitee.com/ljf52007/note/raw/master/images/HTML5+CSS3/%E8%BD%AE%E6%92%AD%E6%8C%89%E9%92%AE.png)

做法简单来说就先设置容器宽高，然后用`background-image`插入背景，再通过`background-position`来取我想要的那一部分。

那如果我现在要实现的是扩大按钮的响应范围，但是按钮图案本身不扩大呢？也就是说，我想要实现这个按钮：

![移动端轮播按钮](https://gitee.com/ljf52007/note/raw/master/images/HTML5+CSS3/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%BD%AE%E6%92%AD%E6%8C%89%E9%92%AE.png)

按钮周围的可响应区域扩大了，毕竟有时候一个图案按钮实在是太小了，用户在点击的时候不一定能准确点击到，电脑端的还能忍受，但是在移动端就很坑人了。那么这个效果怎么实现呢？

在以前，我们可能会这么实现：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
		a{
			width: 100px;
			height: 100px;
			display: block;
			margin: 200px auto;
			position: relative;
		}
		div{
			width: 40px;
			height: 40px;
			background-image: url("abc.png");
			background-position: -83px -12px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -20px;
			margin-top: -20px;
		}
    </style>
</head>
<body>
	<a href="">
		<div></div>
	</a>
</body>
</html>
```

即在`a`标签里面再加一个`div`标签。这样子虽然也能实现我想要的效果，但是它使得页面的层次结构增多了。我们可以使用 `background-origin`、`background-clip` 来实现同样的效果：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>demo</title>
	</head>
	<style type="text/css">
		a{
			width: 100px;
			height: 100px;
			display: block;
			margin: 200px auto;
			padding: 30px;
			/* 为了实现添加padding内容区域不断缩小的效果,需要先将盒模型改为border-box */
			box-sizing: border-box;
			background-image: url("test/abc.png");
			background-position: -83px -12px;
			background-origin: content-box;
			background-clip: content-box;
		}
	</style>
	<body>
		<a href=""></a>
	</body>
</html>
```

可以发现，不仅`HTML`的层次结构没有增加，而且`CSS`代码也少了很多。