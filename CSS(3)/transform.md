# `transform`

- 常用功能：移动、缩放、旋转、斜切

- 执行完毕后会恢复到原始状态

##  移动`translate`

说明：

1. 移动参照移动元素的左上角；

2. 参数为一个时，指水平`x`移动；

3. 参数为两个时，指水平`x`、垂直`y`移动；

4. 特指水平`x`移动：`transform: translateX(xpx);`

5. 特指垂直`y`移动：`transform: translateY(ypx);`

## 缩放`scale`

说明：

1. 参数为`1`时不变化，参数大于`1`时放大，小于`1`时缩小；

2. 参数为一个时，表示`x`和`y`方向等比例缩放；

3. 参数为两个时，表示指定 `x/y` 方向缩放；

4. 特指x方向缩放：`transform: scaleX(x);`

5. 特指y方向缩放：`transform: scaleY(y);`

## 旋转`rotate`

说明：

1. 参数为角度，正值为顺时针旋转，负值为逆时针旋转；

2. `transform-origin` 可以设置旋转轴心（两种方式：一种是 `x y` 值；一种是关键字如` left、right、top、bottom、left top` 等）

## 斜切`skew`

说明：

1. 参数为角度：如果角度为正，则往当前轴的负方向斜切，如果角度为负，则往当前轴的正方向斜切，如下图：（以`transform: skew(60deg)` 为例）

   ![skew](https://gitee.com/ljf52007/note/raw/master/images/HTML5+CSS3/skew.png)

2. 参数为两个时，表示先在`x`斜切，再在`y`斜切；

3. 特指x或y方向斜切：`transform: skewX(xdeg)、transform: skewY(ydeg);`



## 添加多个`transform`属性

添加多个`transform`属性时，切记不能一行一行添加，如下：

```css
transform: translate(100px,100px);
transform: rotate(30deg);
```

这段`CSS`代码执行结果是只旋转不移动的。原因是第一条样式已经被第二条样式覆盖了。正确的写法如下：

```css
transform: translate(100px,100px) rotate(30deg);
```

并且还要注意，**当我们用 `transform` 的 `rotate` 进行旋转的，包括坐标系也会被旋转，这就决定了下面这两行代码实现效果是不同的：**

```css
transform: translate(100px,100px) rotate(-90deg);
transform: rotate(-90deg) translate(100px,100px);
```

第一行是先向`x`移动，后旋转，此时是向右移动的；

第二行是先旋转，后移动，此时由于坐标系也旋转了，因此x已经指向上面了，因此是向上移动。



# `transform`的`3D`变换

在`CSS3`中，我们可以用一个三维坐标系来表示一个`3d`空间：

![CSS中的3d空间](https://gitee.com/ljf52007/note/raw/master/images/HTML5+CSS3/CSS%E4%B8%AD%E7%9A%843d%E7%A9%BA%E9%97%B4.png)

其中，`z`轴指向的是屏幕向外。

要实现`3d`的移动、缩放、旋转，也需要用到`transform`样式。

## 三维移动

```
transform: translate3d(x, y, z);
```

其中`x、y、z`分别表示`x、y、z`方向上的偏移像素值。

也可以分开写：`translateX(x)、translateY(y)、translateZ(z)`

## 三维缩放

```
transform: scale3d(x, y, z);
```

其中`x、y、z`分别表示`x、y、z`方向上的缩放。缩放值与`2d`的类似，`1`不缩放，`＜1`缩小，`＞1`放大。

也可以分开写：`scaleX(x)、scaleY(y)、scaleZ(z)`

## 三维旋转

`transform: rotate3d(x, y, z, angle);`

这里的`x，y，z`决定的`(x，y，z)`其实就是一个向量，相信稍微学过一点数学的人都能理解。

`angle`代表角度，取正取负有一个很实用的方法：**左手原则，即用左手竖起大拇指，大拇指指向的方向与`(x，y，z)`向量指向的方向相同，四指环绕的方向即为正方向。**

也可以分开写：

| 写法             | 说明          |
| ---------------- | ------------- |
| `rotateX(angle)` | 围绕`X`轴旋转 |
| `rotateY(angle)` | 围绕`Y`轴旋转 |
| `rotateZ(angle)` | 围绕`Z`轴旋转 |

## 立方体案例

在做立方体之前，先补两个知识：

- `transform-style`：使被转换的子元素（注意是子元素）保留其`3d`转换（需设置在父元素中），它有如下两个属性值：

| 属性          | 说明                                 |
| ------------- | ------------------------------------ |
| `flat`        | 子元素将不保留其`3D` 位置-平面方式。 |
| `preserve-3d` | 子元素将保留其 `3D` 位置—立体方式。  |

- 景深、透视效果：

（1）`perspective(length)` ：为一个元素设置三维透视的距离。仅作用于元素的后代，而不是其元素本身。当`perspective:none/0;`时，相当于没有设`perspective(length)`。例如我要建立一个小立方体，长宽高都是`200px`。如果我将 `perspective < 200px` ，那就相当于站在盒子里面看的结果，如果`perspective` 非常大那就是站在非常远的地方看（立方体已经成了小正方形了），**意味着`perspective `属性指定了观察者与`z=0`平面的距离**，使具有三维位置变换的元素产生透视效果
（2）`perspective-origin`：属性规定了镜头在平面上的位置，默认是放在元素的中心。如`perspective-origin: 10px 10px;`表示从右下方观察。

根据`3d`移动和`3d`旋转，可以很容易的实现一个立方体，实现效果如下图：

![立方体](https://gitee.com/ljf52007/note/raw/master/images/HTML5+CSS3/%E7%AB%8B%E6%96%B9%E4%BD%93.png)

代码如下：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style type="text/css">
		.box{
			width: 200px;
			height: 200px;
			margin: 100px auto;
			position: relative;
			/* 将立方体旋转一定角度便于观察 */
			transform: rotate3d(1,1,0,30deg);
			/*让子元素保留3d变换之后的效果*/
			transform-style: preserve-3d;
			/* 景深透视效果 */
			perspective: 0px;
			/* 设置景深透视的观察角度 */
			perspective-origin: 0px 0px;
		}
		.box > div{
			width: 200px;
			height: 200px;
			position: absolute;
			opacity: 0.5;
		}
		.front{
			background-color: red;
			transform: translateZ(100px);
		}
		.back{
			background-color: blue;
			transform: translateZ(-100px) rotateX(180deg);
		}
		.left{
			background-color: green;
			transform: translateX(-100px) rotateY(-90deg);
		}
		.right{
			background-color: orange;
			transform: translateX(100px) rotateY(90deg); 
		}
		.top{
			background-color: yellow;
			transform: translateY(-100px) rotateX(90deg);
		}
		.bottom{
			background-color: purple;
			transform: translateY(100px) rotateX(-90deg);
		}
	</style>
</head>
<body>
	<div class="box">
		<div class="front">front</div>
		<div class="back">back</div>
		<div class="left">left</div>
		<div class="right">right</div>
		<div class="top">top</div>
		<div class="bottom">bottom</div>
	</div>
</body>
</html>
```

 