严格上过渡并不算是真正意义上自由的动画，因为它只是初始状态过渡到了最终状态的一个过程。可以理解为只有两个节点。

CSS3的` animation` 样式提供了**关键帧**动画，通过关键字 `@keyframes` 配合 `animation` 可以设置多个节点（可理解为帧数）来精确控制一个或一组动画，常用来实现复杂的动画效果。

## `animation`

| 样式                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `animation-name`            | 指定动画名称,对应`@keyframes`                                |
| `animation-duration`        | 设置动画的总耗时，单位为`s`                                  |
| `animation-iteration-count` | 设置动画播放的次数，参数为数字或`infinite`(循环动画)，默认为`1` |
| `animation-direction`       | 设置动画方向，设置为`alternate`代表反向播放,可达到来回交替的效果 |
| `animation-delay`           | 设置延迟，单位为`s`                                          |
| `animation-timing-function` | 设置动画的执行效果,`linear` 设置匀速                         |
| `animation-play-state`      | 设置动画播放的状态，`running`是播放，`paused`是暂停          |
| `animation-fill-mode`       | 设置动画结束时的状态<br />- `forwards`:会保留动画结束时的状态,在有延迟的情况下,并不会立刻进行到动画的初始状态;<br />- `backwards`:不会保留动画结束时的状态,在添加了动画延迟的前提下,如果动画有初始状态,那么会立刻进行到初始状态;<br />- `both`(默认):会保留动画的结束状态,在有延迟的情况下也会立刻进入到动画的初始状态 |



## `@keyframes`

`@keyframes` 指定动画的关键帧，用百分比来将动画分成多个节点(其中`0%`可用`from`代替，`100%`可用`to`代替).来看一段它的代码：

```css
@keyframes flash_name{
	from{}
	50%{}
	to{}
}
```

其中`flash_name`就是指定的动画名称，它与`animation-name`对应。而`from{}、50%{}、to{}`表示三个节点，可分别在三个节点中添加样式。



## 案例

使用`animation`动画和`transform`移动实现无缝的图片滚动：

```html
<div class="box">
  <ul>
    <li><img src="./壁纸/1.jpg" alt=""></li>
    <li><img src="./壁纸/2.jpg" alt=""></li>
    <li><img src="./壁纸/3.jpg" alt=""></li>
    <li><img src="./壁纸/4.jpg" alt=""></li>
    <li><img src="./壁纸/5.jpg" alt=""></li>
    <li><img src="./壁纸/6.jpg" alt=""></li>
    <li><img src="./壁纸/7.jpg" alt=""></li>
    <li><img src="./壁纸/8.jpg" alt=""></li>
    <li><img src="./壁纸/1.jpg" alt=""></li>
  </ul>
</div>
```

```css
  * {
    margin: 0;
    padding: 0;
  }
  ul, li {
    list-style: none;
  }
  .box {
    width: 800px;
    height: 150px;
    margin: 100px auto;
    overflow: hidden;
  }
  img {
    width: 200px;
    height: 150px;
  }
  li {
    float: left;
  }
  ul {
    width: 9999px;
    animation-name: move;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    /*animation-direction: alternate;*/
    /*animation-delay: 0s;*/
    animation-timing-function: linear;
    /*animation-fill-mode: forwards;*/
  }
  @keyframes move {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-800px);
    }
  }
```



## `animation` 动画库

`animate.css` 是`CSS3`的一个动画库，我这里先贴上一个 [animate.css网址](https://daneden.github.io/animate.css/)。可以通过这个网址下载 `animate.css`，也可以查看它的使用说明，甚至能对库里的动画效果进行演示。

`animate.css` 动画库的使用我自己认为还是很简单的，毕竟就是一个包含了很多动画效果的 `css` 文件，很好理解。在使用的时候，我简单地将其分为三步：

（1）调用库：

```html
<link rel="stylesheet" type="text/css" href="animate.css"/>
```

（2）添加类：

在` animate.css` 中，每种动画都用不同类名区分，若我们想要对某个元素添加某种动画效果，就只需要给这个元素添加对应的类名（注意在通过类名选择动画时，类名除了动画效果本身的类名外，还要有个 `animated` 类名）即可。

当然了，为一个元素添加类名的方法那就多了去了，所以能实现各种方式来展现动画：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="animate.css"/>
	<title></title>
	<style type="text/css">
		div{
			width: 100px;
			height: 100px;
			background-color: #FF6700;
			margin: 100px auto;
		}
	</style>
</head>
<body>
	<div id="demo"></div>
	<script type="text/javascript">
		div = document.querySelector("#demo");
		div.onclick = function(){
			div.classList.add("animated");
			div.classList.add("shake");
			//设置setTimeout,设置在点击元素后移除动画效果,这样2s后再次点击依旧有动画效果
			setTimeout(function(){
				div.classList.remove("shake");
			},2000);
		}
	</script>
</body>
</html>
```

（3）自行配置一些动画效果

我们可以自行更改库中的动画的一些参数，比如我嫌上例中` shake `动画摇得太快了，就可以在`css`样式中将他的 `animation-duration` 改得大一点：

```css
#demo{
	animation-duration: 5s;
}
```

