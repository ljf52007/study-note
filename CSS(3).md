# 1 选择器

`CSS(3)`中提供的选择器手册`(w3school)`：http://www.w3school.com.cn/cssref/css_selectors.asp

## 1.1 基本选择器

| 选择器     | 例子                                                         |
| ---------- | ------------------------------------------------------------ |
| 类选择器   | `.class`                                                     |
| 标签选择器 | `div`                                                        |
| id选择器   | `#id`                                                        |
| 后代选择器 | `div p`：选择 `div` 内部的全部 `p` 元素                      |
| 子代选择器 | `div > p`：选择以 `div` 为父元素的全部 `p` 元素              |
| 群组选择器 | `div,p`：选择 `div` 和 `p`                                   |
| 相邻选择器 | `div + p`：选择与 `div` 相邻的，并且元素类型为 `p` 的元素，相邻和`p`类型，两个条件都要满足，缺一不可 |
| 兄弟选择器 | `div ~ p`：选择`div`的兄弟元素，且元素类型为`p`              |



## 1.2 属性选择器

| 写法          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| `[attr]`      | 选择存在`attr`属性的元素，如果想要限制元素类型，则可以写成 `E[attr]`，下同 |
| `[attr=val]`  | 选择属性值完全等于`val`的元素，引号可加可不加                |
| `[attr*=val]` | 选择属性值里包含`va`l字符的元素                              |
| `[attr^=val]` | 选择属性值里以`val`字符开头的元素                            |
| `[attr$=val]` | 选择属性值里以`val`字符结尾的元素                            |



## 1.3 伪类选择器

> 伪类存在的意义是为了通过选择器找到那些不存在`DOM`树中的信息以及不能被常规`CSS`选择器获取到的信息

1. 获取不存在与`DOM`树中的信息。比如`a`标签的`:link`、`visited`等，这些信息不存在与`DOM`树结构中，只能通过`CSS`选择器来获取；
2. 获取不能被常规`CSS`选择器获取的信息。比如：要获取第一个子元素，我们无法用常规的`CSS`选择器获取，但可以通过 `:first-child` 来获取到。

### 1.3.1 超链接伪类选择器

| 写法        | 说明                        |
| ----------- | --------------------------- |
| `a:link`    | 定义`a`元素未访问时的样式   |
| `a:visited` | 定义`a`元素访问后的样式     |
| `a:hover`   | 定义鼠标经过`a`元素时的样式 |
| `a:active`  | 定义鼠标点击`a`激活时的样式 |

注意：

1. 在定义这四个伪类的时候，要按照` link、visited、hover、active` 的顺序进行，即“爱恨原则”——“`LoVe HAte`”:
   - 当鼠标划过`a`链接时,`a`链接同时满足`:link`和`:hover`两种状态,因此,要改变`a`链接的样式,就必须把`:hover`放在`:link`之后;
   - 当鼠标点击`a`链接时,`a`链接同时满足`:link`,`:hover`和`active`三种状态.因此,要改变`a`链接的样式,就必须把`:active`放在`:link`和`:hover`之后;
   - 当`a`链接访问过时,情况基本同上,只不过需要将`:link`换成`:visited`.
   - `:link`和`:visited`可以交换位置,因为一个`a`链接要么处于未访问状态,要么处于访问状态,他们并不冲突.
2. hover 伪类并不限用于 a 元素，它可以定义任何一个元素在鼠标经过时的样式。



### 1.3.2 相对于父元素的结构伪类

| 写法                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `E:first-child`       | 查找`E`这个元素的父元素的第一个子元素`E`，如果第一个子元素不是`E`类型，则查找无效 |
| `E:last-child`        | 查找`E`这个元素的父元素的最后一个子元素`E`，如果最后一个子元素不是`E`类型，则查找无效 |
| `E:nth-child(n)`      | 查找`E`这个元素的父元素的第`n`个子元素`E`（注意索引是从1开始的，第一个的索引就是1，不要下意识以为第一个的索引是0）<br />如果第`n`个子元素不是`E`类型，则查找无效；`n`也可以是关键字或表达式，见下 |
| `E:nth-last-child(n)` | 同`E:nth-child(n)` 相似，只是倒着计算                        |
| `E:nth-child(even)`   | 此处`n`就是取关键字`even`，表示偶数项的元素                  |
| `E:nth-child(odd)`    | 此处`n`就是取关键字`odd`，表示奇数项的元素                   |
| `E:empty`             | 选中没有任何子节点的`E`元素，注意，空格也算子元素            |
| `E:target`            | 结合锚点进行使用，处于当前锚点的元素会被选中                 |


上面有关`child`的选择器我们可以发现到一个很大的缺点，就是在查找的过程中并没有将元素类型限制成我们想要查找的`E`类型，一旦按照索引查找到的元素不是`E`类型的元素，则查找无效，这在变化多端的动态数据中是极其容易出现的。因此，`CSS3`又提供了更为实用的选择器：

| 写法               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| `E:first-of-type`  | 查找`E`元素的父元素的第一个`E`类型的元素，查找的时候只会查找满足`E`类型的元素，过滤掉其它类型的元素 |
| `E:last-of-type`   | 查找`E`元素的父元素的最后一个`E`类型的元素，查找的时候只会查找满足`E`类型的元素，过滤掉其它类型的元素 |
| `E:nth-of-type(n)` | 查找`E`元素的父元素的第`n`个`E`类型的元素，查找的时候只会查找满足`E`类型的元素，过滤掉其它类型的元素 |

需要重点说明的是关于 `nth-child(n)` 和 `nth-of-type(n) `中的`n`，它遵循线性变化，取值范围为0~查找元素的长度。但是当 `n≤0`时，选取是无效的。如当 `n` 是一个表达式，`nth-of-type(-n+5)` 表示查找 `nth-of-type(5)、nth-of-type(4)、nth-of-type(3)、nth-of-type(2)、nth-of-type(1)`，即查找前五个子元素 。

## 1.4 伪元素选择器

> 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过`:before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。常见的伪元素有：`::before`，`::after`，`::first-line`，`::first-letter`，`::selection`、`::placeholder`等

> 因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素

| 例子              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| `E::before`       | 定义在一个元素之前插入 `content `属性定义的内容和样式        |
| `E::after`        | 定义在一个元素之前插入 `content` 属性定义的内容和样式        |
| `E::first-letter` | 文本的第一个字母或字(不是词组)                               |
| `E::first-line`   | 文本第一行；如果设置了`::first-lette`，那么无法同时设置`::first-line`的样式 |
| `E::selection`    | 可改变选中文本的样式；它只能设置显示的样式，而不能设置内容大小 |

`E::before、E::after`：分别定义在一个元素之前和之后插入 `content` 属性定义的内容和样式。注意：

1. 是一个行内元素，需要通过以下三种方法转换成块元素：`float、display:block、position`（常用）；

2. 必须添加 `content:""`，就算不设置内容；

3. 在`CSS2`中是伪类——`E:before、E:after`，在`CSS3`中是伪元素——`E::before、E::after`。在新版本下，`E:after、E:before`会被自动识别为`E::after、E::before`。有时为了兼容处理，还是会写成`E:after、E:before`。



## 1.5 浏览器是如何解析`css`选择器的

样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

采用这种解析方式的原因是:

- `HTML` 经过解析生成` DOM Tree`；而在 `CSS` 解析完毕后，需要将解析的结果与 `DOM Tree` 的内容一起进行分析建立一棵 `Render Tree`，最终用来进行绘图。`Render Tree` 中的元素（`WebKit` 中称为`renderers`，`Firefox` 下为`frames`）与 `DOM `元素相对应，但非一一对应：一个 `DOM` 元素可能会对应多个 `renderer`，如文本折行后，不同的「行」会成为 `render tree` 种不同的 `rendere`r。也有的 `DOM` 元素被` Render Tree` 完全无视，比如 `display:none` 的元素。
- 在建立` Render Tree` 时（`WebKit`中的`Attachment`过程），浏览器就要为每个 `DOM Tree` 中的元素根据 `CSS` 的解析结果（`Style Rules`）来确定生成怎样的` renderer`。对于每个 `DOM` 元素，必须在所有 `Style Rules` 中找到符合的 `selector` 并将对应的规则进行合并。选择器的「解析」实际是在这里执行的，在遍历 `DOM Tree` 时，从 `Style Rules` 中去寻找对应的 `selector`。
- 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 `DOM` 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个` selector` 不匹配当前元素」就是极其重要的。
- 如果正向解析，例如「`div div p em`」，我们首先就要检查当前元素到 `html` 的整条路径，找到最上层的 div，再往下遍历，如果遇到不匹配的就需要回溯到顶层,如此回溯若干次才能找到确切的`dom`;
- 逆向匹配则不同，如果当前的 `DOM` 元素是 div，而不是 `selector` 最后的 `em`，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。
- 因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的。同时我们也能够看出，在选择器结尾加上「*」就大大降低了这种优势，这也就是很多优化原则提到的尽量避免在选择器末尾添加通配符的原因。

# 2 `CSS`优先级算法

## 2.1 优先级比较

`!important` > 内联样式 = 外联样式 > `ID`选择器 > `class`选择器 = 伪类选择器 = 属性选择器 > 元素选择器 = 伪元素选择器 > 通配选择器 = 后代选择器 = 兄弟选择器 > 浏览器自定义或继承 > 默认

## 2.2 权重计算

我们把特殊性分为5个等级，每个等级代表一类选择器，每个等级的值为其所代表的选择器的个数乘以这一等级的权值，最后把所有等级的值相加得出选择器的特殊值。

5个等级的定义如下：

1. 第一等：代表内联样式，如: `style=””`，权值为1000。
2. 第二等：代表`ID`选择器，如：`#content`，权值为0100。
3. 第三等：代表类，伪类和属性选择器，如`.content`，权值为0010。
4. 第四等：代表元素选择器和伪元素选择器，如`div p`，权值为0001。
5. 第五等：通配选择器`*`，子选择器`>`，相邻同胞选择器`+`，权值为0000

## 2.3 渲染规则

1. 优先级不同: 优先级高的样式覆盖优先级低的样式;
2. 选择器的最高优先级相同: 计算等级的权重和,权重和高的样式覆盖权重和低的样式;
3. 优先级,权重都相同: 后写的样式覆盖前面的样式;

# 3 CSS属性继承

在CSS中，对于一些可以继承的属性，可以只设置上级的CSS样式表树形，子级（下级）不用设置，会自动继承此CSS属性，可以减少CSS代码，便于维护。

那么CSS有哪些属性可以自动继承呢

## 3.1 有继承性的属性

**1、字体系列属性**

**font**：组合字体

**font-family**：规定元素的字体系列

**font-weight**：设置字体的粗细

**font-size**：设置字体的尺寸

**font-style**：定义字体的风格

**font-variant**：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。

**font-stretch**：允许你使文字变宽或变窄。所有主流浏览器都不支持。

**font-size-adjust**：为某个元素规定一个 aspect 值，字体的小写字母 "x"的高度与"font-size" 高度之间的比率被称为一个字体的 aspect 值。这样就可以保持首选字体的 x-height。



**2、文本系列属性**

**text-indent**：文本缩进

**text-align**：文本水平对齐

**text-shadow**：设置文本阴影

**line-height**：行高

**word-spacing**：增加或减少单词间的空白（即字间隔）

**letter-spacing**：增加或减少字符间的空白（字符间距）

**text-transform**：控制文本大小写

**direction**：规定文本的书写方向

**color**：文本颜色



**3、元素可见性：**

**visibility**



**4、表格布局属性：**

**caption-side**

**border-collapse**

**empty-cells**



**5、列表属性：**

**list-style-type**

**list-style-image**

**list-style-position**

**ist-style**



**6、设置嵌套引用的引号类型：quotes**



**7、光标属性：cursor**



8、还有一些不常用的；speak，page等属性，暂不讲解；



**所有元素可以继承的属性：**

1、元素可见性：visibility

2、光标属性：cursor



**内联元素可以继承的属性:**

1、字体系列属性

2、除text-indent、text-align之外的文本系列属性



**块级元素可以继承的属性:**

text-indent、text-align



## 3.2 无继承性的属性

1、display

2、文本属性：

vertical-align

text-decoration

3、盒子模型的属性:宽度、高度、内外边距、边框等

4、背景属性：背景图片、颜色、位置等

5、定位属性：浮动、清除浮动、定位position等

6、生成内容属性:content、counter-reset、counter-increment

7、轮廓样式属性:outline-style、outline-width、outline-color、outline

8、页面样式属性:size、page-break-before、page-break-after



## 3.3 继承中比较特殊的几点

1. a 标签的字体颜色不能被继承

2. \<h1>-\<h6>标签字体的大下也是不能被继承的，因为它们都有一个默认值
3. **设置inherit属性可以强制让这个样式继承父级样式，这个属性存在于每个样式。**



# 4 CSS居中的方法

## 4.1 行内元素、块级元素、行内块元素

首先明确行内元素（inline）、块级元素（block）、行内块元素（inline-block）的区别和联系。

|          | 行内元素                                                     | 块级元素                                                     | 行内块元素                           |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------ |
| 放置方式 | 与其他行内元素位于同一行                                     | 每个块元素独占一行（除非用一些方法来脱离文档流，如浮动 float 或定位） | 与其他行内元素或行内块元素位于同一行 |
| 宽高设置 | 不可以自定义宽高，只能通过文本或图片来决定宽高               | 可以自定义宽高，如果宽度不设置，默认为父容器的宽度（即 width: 100%） | 可以自定义宽高                       |
| 间距设置 | 左右间距可以设置，但是顶部和底部的间距不可设置               | 上下左右的间距都可以设置                                     | 上下左右的间距都可以设置             |
| 常见元素 | span、img、a、label、input、abbr（缩写）、em（强调）、big、cite（引用）、i（斜体）、q（短引用）、textarea、select、small、sub、sup，strong、u（下划线）、button | div、p、h1~h6、ul、ol、dl、li、dd、table、hr、blockquote、address、table、menu、pre，HTML5新增的header、section、aside、footer等 |                                      |

在CSS中，我们可以通过 **display** 对这三种元素进行转换：

|                        |                  |
| ---------------------- | ---------------- |
| display: block;        | 设置为块级元素   |
| display: inline;       | 设置为行内元素   |
| display: inline-block; | 设置为行内块元素 |

## 4.2 水平居中

1. 行内元素:

   ```css
   text-align: center;
   ```

   有时候` text-align: center` 也会和 `display: inline-block` 配合使用，实现行内多个块级元素的水平居中:

   ```css
   div{
       text-align: center;
   }
    
   #div1{
       display: inline-block;
   }
   #div2{
       display: inline-block;
   }
   ```

2. 块级元素-定宽

   ```
   margin: 0 auto;
   ```

3. 块级元素-不定宽

   1. `table`布局

   2. `position`+`transform`

      ```css
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      ```


## 	4.3 垂直居中

1. 块级元素-定高

   ```css
   height: 100px;
   position: absolute;
   top: 50%;
   margin-top: -50px;
   ```

2. 块级元素-不定高

   - `position`+`transform`

     ```css
     position: absolute;
     top: 50%;
     transform: translateY(-50%);
     ```

   - `flex`

   - `IFC`+`vertical-align: middle`

     ```
      
     ```


## 4.4 水平-垂直居中

1. 不定高:

   ```html
   <div class="father">
       <div class="son">这些文字会把son的高度撑开这些文字会把son的高度撑开</div>
   </div>
   ```

   - `position`+`transform`

     ```css
     .father {
         width: 200px;
         height: 200px;
         background: yellow;
         position: relative;
     }
     .son {
         width: 50%;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         background: red;
     }
     ```

   - `flex`

     ```css
     .father {
         width: 200px;
         height: 200px;
         background: yellow;
         display: flex;
         justify-content: center;
         align-items: center;
     }
     .son {
         width: 50%;
         background: red;
     }
     ```

2. 定高

   - 上述的两种不定高的方法都能用

   - `margin`+绝对定位

     ```css
     .father {
         width: 200px;
         height: 200px;
         background: yellow;
         position: relative;
     }
     .son {
         width: 100px;
         height: 100px;
         background: red;
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
         margin: auto;
     }
     ```

   - `position`+`margin`

     ```css
     .father {
         width: 200px;
         height: 200px;
         background: yellow;
         position: relative;
     }
     .son {
         width: 100px;
         height: 100px;
         background: red;
         position: absolute;
         top: 50%;
         left: 50%;
         margin-top: -50px;
         margin-left: -50px;
     }
     ```



## 4.5 伸缩盒子的对齐方式

将父盒子设置为伸缩盒子,可以实现水平-垂直居中:

```css
.father{
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

我们也可以单独设置某一个子元素居中：

**单独设置某一个子元素垂直居中：**

```css
.son:first-of-type {
    align-self: center;
}
```

**单独设置某一个子元素水平居中：**

```css
.father {
    width: 200px;
    height: 200px;
    background: yellow;
    display: flex;
    flex-direction: column;
}
.son {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
.son:first-of-type {
    align-self: center;
}
```



# 5 `CSS`清除浮动

浮动在开发中非常常用，用来使浮动元素脱离文档流进行左浮或者右浮，直到碰到父级元素或者其他的浮动元素。

但是浮动也会产生一些问题，会对前后的标签产生影响，如我们想实现下面的效果：

![](./images/HTML5+CSS3/浮动1.png)

代码如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			*{
				padding: 0;
				margin: 0;
			}
			.dv{
				width: 150px;
				height: 150px;
				/* 添加左浮动 */
				float: left;
			}
			.div1{
				background-color: yellow;
			}
			.div2{
				background-color: orangered;
			}
			.div3{
				background-color: skyblue;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="dv div1"></div>
			<div class="dv div2"></div>
			<div class="dv div3"></div>
		</div>
		<p>我是一段想要独占一行的文字</p>
	</body>
</html>
```

但是执行结果如下：

![](./images/HTML5+CSS3/浮动2.png)

可以发现，本来应该独占一行的p内容，却和三个div同行了，这是由于三个div的浮动脱离了文档流导致的。

清除浮动有以下几种方法:

1. 给父元素添加高度`height`

   ```css
   .box{
   	height: 150px;
   }
   ```

   给父元素添加 height 解决了父元素无法自动获取高度的问题。

   但是这种方法只适合高度固定的布局，因为要给出精确的高度，如果高度和父级div不一样时，会产生问题。

   

2. 结尾添加` div/br` 标签，样式为`clear: both`

   ```css
   .div4{
   	clear: both;
   }
   ```

   不推荐使用，需要在布局中添加新的元素。

   

3. **触发`BFC`**

   - 设置父元素`display`为`inline-block`或`table`

   ```css
   .box{
   	display: table;
       /*或 display: inline-block*/
   }
   ```

   不推荐使用，改变了父级div的属性，会产生一些新的问题。

   - 父级元素也一起浮动

     不推荐使用,会产生新的浮动问题.

   - 父级元素`overflow`不为`visible`

     ```
     .box {
     	overflow: auto;
     	/* overflow: hidden; */
     }
     ```

     不推荐使用，不能定义`height`,浏览器会自动检查浮动区域的高度,容易出现滚动条。

   

4. **（常用）伪元素和`zoom`**

   ```css
   .box::after,.box::before{
   	content: "";
   	display: block;
   	line-height: 0px;
   	height: 0px;
   	clear: both;
   	visibility: hidden;
   }
   .box{
   	/* 解决IE兼容问题 */
   	zoom: 1;
   }
   ```

   推荐使用，常用于公共类，节省代码。


# 6 `CSS`隐藏页面元素

隐藏页面元素有以下几种方法,他们各有特点:

| 样式                     | 原理                                          | 特点              |
| ------------------------ | --------------------------------------------- | ----------------- |
| `opacity: 0;`            | 本质是把元素的透明度设置为0                   | 占据空间,可以交互 |
| `visibility: hidden;`    | 隐藏元素                                      | 占据空间,不可交互 |
| `overflow: hidden;`      | 隐藏元素溢出的部分                            | 占据空间,不可交互 |
| `display: none;`         | 彻底隐藏元素                                  | 不占空间,不可交互 |
| `z-index: -9999;`        | 原理是把元素的层级置于底部,使其被上层元素覆盖 | 元素本身存在      |
| `transform: scale(0,0);` | 平面变换,将元素缩放为0                        | 占据空间,不可交互 |

# 6 颜色设置

HTML5中提供了两种颜色的设置：

## 6.1 RGBA

R：红色值，0~255之间，rgb(255,0,0) 代表纯红色；

G：绿色值，0~255之间，rgb(0,255,0) 代表纯绿色；

B：蓝色值，0~255之间，rgb(255,0,0) 代表纯蓝色；

A：Alpha，透明度，0~1之间，不可为负数。

## 6.2 HSLA

H：Hue，色调、色相。取值为0~360，过渡为“红橙黄绿青蓝紫红”，0和360代表红色，30代表橙色，60代表黄色，120代表绿色，180代表青色，240代表蓝色，300代表紫色。见下图：

![HSLA](./images/HTML5+CSS3/HSLA.png)

S：Saturation，饱和度，取值为0.0%~100.0%；

L：Lightness，亮度，取值为0.0%~100.0%，50%是默认值和平衡值。

A：Alpha，透明度，取值0~1之间。



## 6.3 透明度

在之前我们用 opacity 来设置透明度，也是可行的。但是 opacity 只能针对整个盒子设置透明度。子盒子及内容会继承父盒子的透明度；

rgba来控制颜色和透明度，相对于 opacity，不具有继承性。



# `CSS3`新特性

`box-sizing:content-box | border-box`:盒模型

`text-shadow`:水平阴影,垂直阴影,模糊的距离,以及阴影的颜色

`box-shadow`:阴影

`box-radius`:圆角

`gradient`:渐变

`word-break:normal|break-all|keep=all`:文字换行(默认 | 单词也可以换行 | 只在半角空格或连字符换行)

`text-overflow`: 文字超出部分处理

`transition`:过渡

`transform`:旋转,缩放,移动,倾斜

`animation`:动画

`@media screen and (max-width: 960px) {}`:媒体查询

`calc`函数

等等...

# 盒模型

`CSS`的盒子结构如下图：`content`+`padding`+`border`+`margin`.

![CSS盒结构](./images/HTML5+CSS3/CSS盒结构.png)

盒模型是页面渲染时,`dom`元素所采用的布局模型.可通过`box-sizing`进行设置.

我们在`CSS`中设置 宽高`width`和`height`,默认情况下,盒子的宽高指的是`content`的宽高,即`box-sizing`默认值为`content-box`.`content-box`往往会造成，当我给一个盒子添加 border 或 padding 的时候，页面结构产生错位。这是由于父盒子的宽度已经不够支撑四个子盒子的宽度总和了。这时候我们可能会将父盒子的宽度调大一点，但是这样子去调试往往是不符合需求的。

我们可以通过`box-sizing`设置盒模型来解决这个问题,`box-sizing`有以下两种属性值:

1. `box-sizing: content-box`:标准盒模型

   即默认情况下的盒模型,设置盒子的`width`和`height`仅仅是`content`的宽高.

   总宽度 = `margin + border + padding + width`.

2. `box-sizing: border-box`:怪异盒模型(或IE盒模型)

   设置的`width`属性值就是盒子的最终宽度,包含`padding`和`border`.也就是说,如果给盒子添加`padding`或`border`,那么真正放置内容的`content`会减小,但是它可以稳固页面的结构.

   总宽度 = `margin + width`.

3. `inherit`:从父元素继承`box-sizing`属性.

# 阴影

## 7.1 文本阴影

语法：

```css
text-shadow: offsetX offsetY blur color;
```

其中，`offsetX` 和 `offsetY` 分别表示坐标轴坐标；blur 为模糊值。

可以同时为一个文本设置多种阴影：

```css
text-shadow: offsetX1 offsetY1 blur1 color1, offsetX2 offsetY2 blur2 color2;
```



## 7.2 边框阴影

语法：

```css
box-shadow: h v blur spread color inset
```

其中，

h 和 v 分别表示水平和垂直，用法与文本阴影的 offsetX 和 offsetY相同；

blur 表示模糊值，可选值，默认为0；

spread 表示阴影的尺寸，可以扩展或收缩阴影大小，可选值，默认为0；

color 表示颜色，可选值，默认为0；

inset 表示内阴影。一般配合设置两个阴影，以达到四个方向都有阴影，如：

```css
{box-shadow: -10px 10px 5px 0px rgba(0,0,150,0.2) inset,10px -10px 5px 0px rgba(0,0,150,0.2) inset;}
```

#  边框圆角

border-radius 可以用来设置边框圆角。后面的像素值表示半径，拿右上角作为例子来解释：（如图）

![边框圆角](./images/HTML5+CSS3/边框圆角.png)

添加圆角的各种情况：

| 写法                                                   | 说明                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| border-radius: 10px;                                   | 设置四个角的相同圆角值                                       |
| border-radius: 10px 20px;                              | 第一个值设置左上↖和右下↘，第二个值设置右上↗和左下↙           |
| border-radius: 10px 20px 30px;                         | 第一个值设置左上↖，第二个值设置右上↗和左下↙，第三个值设置右下↘ |
| border-radius: 10px 20px 30px 40px;                    | 分别设置左上，右上，右下，左下                               |
| border-radius: 50px/100px;                             | 设置 水平x/垂直y 方向的半径值                                |
| border-top-left: 10px;                                 | 指定位置添加圆角                                             |
| border-top-right: 10px;                                | 指定位置添加圆角                                             |
| border-bottom-left: 10px;                              | 指定位置添加圆角                                             |
| border-bottom-right: 10px;                             | 指定位置添加圆角                                             |
| border-top-left: 10px 20px;                            | 指定位置设置 水平x/垂直y 方向的半径值                        |
| border-top-right: 10px 20px;                           | 指定位置设置 水平x/垂直y 方向的半径值                        |
| border-bottom-left: 10px 20px;                         | 指定位置设置 水平x/垂直y 方向的半径值                        |
| border-bottom-right: 10px 20px;                        | 指定位置设置 水平x/垂直y 方向的半径值                        |
| border-radius:100px 80px 60px 40px/20px 30px 40px 50px | 设置四个角点的 水平x/垂直y 方向上的不同圆角值，一一对应      |

#  渐变

由于渐变效果不是单一的颜色，而是图像，因此应该写在 background 中。如

```css
{background: linear-gradient(to right,red 0%,blue 100%);}
```

## 10.1 线性渐变

线性渐变可以理解为就是沿着一条线去做颜色的渐变。

- 语法：

```css
linear-gradient(方向, 颜色1 位置百分比, 颜色2 位置百分比, 颜色3 位置百分比...)
```

- 说明：

方向可以是关键字，也可以是度数。例如 to top 就是 0deg，to right 就是 90deg，自然右上方就是 45deg，以此类推。

![线性渐变](./images/HTML5+CSS3/线性渐变.png)


颜色1一般代表开始的颜色，位置百分比就是所在位置。如0%代表开始位置，100%代表结束位置，50%代表中间位置。



## 10.2 径向渐变

径向渐变就是由一点往周围渐变。

- 语法：

```
radial-gradient(形状 大小 at 坐标, 颜色1 位置百分比, 颜色2 位置百分比...)
```

- 说明：

形状—— circle 表示产生圆形的渐变；ellipse 表示自动适配当前的容器形状（默认）；

大小—— closest-side：最近边； farthest-side：最远边； closest-corner：最近角； farthest-corner：最远角（默认）。

![径向渐变](./images/HTML5+CSS3/径向渐变.png)

坐标：以左上角为坐标原点，设置X和Y坐标。注意，写横纵坐标前要加 at：

```css
{background: radial-gradient(circle farthest-corner at 0px 0px,red,red 30%,blue 70%,blue);}
```



## 10.3 重复渐变

重复渐变主要就是 repeating-radial-gradient() 和 repeating-linear-gradient()。我认为通过一个案例来记住它们更为有效：

```css
{background: repeating-radial-gradient(circle closest-side,
			#fff 0%,#fff 10%,
			#ff6700 10%,#ff6700 20%);}
```

这里其实就是设置了两个环的颜色之后，剩下的自动补充至100%。实现效果为：

![重复渐变1](./images/HTML5+CSS3/重复渐变1.png)

同样的，我们也可以做一个repeating-linear-gradient() 的案例：

```css
{background: repeating-linear-gradient(45deg,
			#fff 0%,#fff 10%,
			#ff6700 10%,#ff6700 20%);}
```

实现效果为：

![重复渐变2](./images/HTML5+CSS3/重复渐变2.png)



# 文本处理

## `word-break`

| 属性值      | 说明                         |
| ----------- | ---------------------------- |
| `normal`    | 使用浏览器默认的换行规则     |
| `break-all` | 允许在单词间换行             |
| `keep-all`  | 只能在半角空格或连字符处换行 |



## 文字超出显示省略号

1. 单行省略

   ```css
   div {
       width: 200px;
   	overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
   }
   ```

   

2. 多行省略

   ```css
   div {
   	display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 3;
       overflow: hidden;
   }
   ```

   该方法适用于WebKit浏览器及移动端.

   兼容方案:使用伪元素`::before`或通过`JS`实现.

# 13 过渡 transition

| 过渡样式                   | 说明                                                        |
| -------------------------- | ----------------------------------------------------------- |
| transition-property        | 添加过渡效果的样式属性名称                                  |
| transition-duration        | 过渡效果的耗时，以秒（s）作为单位                           |
| transition-timing-function | 过渡时间函数，控制过渡的速度，匀速是linear                  |
| transition-delay           | 过渡效果的延迟，默认为0s                                    |
| step(x)                    | 把过渡分为指定的 x 步进行                                   |
| 简写                       | transition: property duration timing-function delay step(4) |

注意：

（1）过渡效果执行完毕之后，默认会还原到原始状态

（2）**过渡效果只能产生从某个值到另外一个具体的值的过渡，例如它无法从 display: none 过渡到 display: block ，可以从 height: 0px 过渡到height: 10px。**

（3）过渡存在一些兼容性的问题，最好添加前缀，如

            -moz-transition
            -webkit-transition
            -o-transition

## 案例

学习了过渡之后，我就可以对我之前做的仿小米官网静态页面进行改进，比如将下拉框用过渡样式来做，视觉效果比用 display: none / display: block 组合好很多。

关键代码：

```css
            width: 100%;
            height:0px;
            overflow: hidden;
            /*display: none;*/
            /*添加过渡效果:过渡效果只能产生从某个值到另外一个具体的值的过渡*/
            /*1.一定要设置为哪些css样式添加过渡效果*/
            /*transition-property: display;*/
            transition-property: height;
            /*2.一定要设置过渡效果的耗时*/
            transition-duration: 1s;
```



# 14 transform

- 常用功能：移动、缩放、旋转、斜切

- 执行完毕后会恢复到原始状态

## 14.1 移动：translate

说明：

1. 移动参照移动元素的左上角；

2. 参数为一个时，指水平x 移动；

3. 参数为两个时，指水平x、垂直y 移动；

4. 特指水平x移动：transform: translateX(xpx);

5. 特指垂直y移动：transform: translateY(ypx);

## 14.2 缩放：scale

说明：

1. 参数为1时不变化，参数大于1时放大，小于1时缩小；

2. 参数为一个时，表示x和y方向等比例缩放；

3. 参数为两个时，表示指定 x/y 方向缩放；

4. 特指x方向缩放：transform: scaleX(x);

5. 特指y方向缩放：transform: scaleY(y);

## 14.3 旋转：rotate

说明：

1. 参数为角度，正值为顺时针旋转，负值为逆时针旋转；

2. transform-origin 可以设置旋转轴心（两种方式：一种是 x y 值；一种是关键字如 left、right、top、bottom、left top 等）

## 14.4 斜切：skew

说明：

1. 参数为角度：如果角度为正，则往当前轴的负方向斜切，如果角度为负，则往当前轴的正方向斜切，如下图：（以transform: skew(60deg) 为例）

   ![skew](./images/HTML5+CSS3/skew.png)

2. 参数为两个时，表示先在x斜切，再在y斜切；

3. 特指x或y方向斜切：transform: skewX(xdeg)、transform: skewY(ydeg);



## 14.5 添加多个transform属性

添加多个 transform是属性时，切记不能一行一行添加，如下：

```
transform: translate(100px,100px);
transform: rotate(30deg);
```

这段CSS代码执行结果是只旋转不移动的。原因是第一条样式已经被第二条样式覆盖了。正确的写法如下：

```
transform: translate(100px,100px) rotate(30deg);
```

并且还要注意，**当我们用 transform 的 rotate 进行旋转的，包括坐标系也会被旋转，这就决定了下面这两行代码实现效果是不同的：**

```
transform: translate(100px,100px) rotate(-90deg);
transform: rotate(-90deg) translate(100px,100px);
```

第一行是先向x移动，后旋转，此时是向右移动的；

第二行是先旋转，后移动，此时由于坐标系也旋转了，因此x已经指向上面了，因此是向上移动。



# 15 transform的3D变换

在CSS3中，我们可以用一个三维坐标系来表示一个3d空间：

![CSS中的3d空间](./images/HTML5+CSS3/CSS中的3d空间.png)

其中，z轴指向的是屏幕向外。

要实现3d的移动、缩放、旋转，也需要用到 transform样式。

## 三维移动

```
transform: translate3d(x, y, z);
```

其中x、y、z分别表示x、y、z方向上的偏移像素值。

也可以分开写：translateX(x)、translateY(y)、translateZ(z)

## 三维缩放

```
transform: scale3d(x, y, z);
```

其中x、y、z分别表示x、y、z方向上的缩放。缩放值与2d的类似，1不缩放，＜1缩小，＞1放大。

也可以分开写：scaleX(x)、scaleY(y)、scaleZ(z)

## 三维旋转

transform: rotate3d(x, y, z, angle);

这里的x，y，z决定的（x，y，z）其实就是一个向量，相信稍微学过一点数学的人都能理解。

angle代表角度，取正取负有一个很实用的方法：**左手原则，即用左手竖起大拇指，大拇指指向的方向与（x，y，z）向量指向的方向相同，四指环绕的方向即为正方向。**

也可以分开写：

| 写法           | 说明        |
| -------------- | ----------- |
| rotateX(angle) | 围绕X轴旋转 |
| rotateY(angle) | 围绕Y轴旋转 |
| rotateZ(angle) | 围绕Z轴旋转 |

## 立方体案例

在做立方体之前，先补两个知识：

- **transform-style**：使被转换的子元素（注意是子元素）保留其3d转换（需设置在父元素中），它有如下两个属性值：

| 属性        | 说明                                |
| ----------- | ----------------------------------- |
| flat        | 子元素将不保留其 3D 位置-平面方式。 |
| preserve-3d | 子元素将保留其 3D 位置—立体方式。   |

- 景深、透视效果：

（1）**perspective(length)** ：为一个元素设置三维透视的距离。仅作用于元素的后代，而不是其元素本身。当perspective:none/0;时，相当于没有设perspective(length)。例如我要建立一个小立方体，长宽高都是200px。如果我将 perspective < 200px ，那就相当于站在盒子里面看的结果，如果perspective 非常大那就是站在非常远的地方看（立方体已经成了小正方形了），意味着**perspective 属性指定了观察者与z=0平面的距离**，使具有三维位置变换的元素产生透视效果
（2）**perspective-origin**：属性规定了镜头在平面上的位置，默认是放在元素的中心。如perspective-origin: 10px 10px; 表示从右下方观察。

根据3d移动和3d旋转，可以很容易的实现一个立方体，实现效果如下图：

![立方体](./images/HTML5+CSS3/立方体.png)

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



# 16 animation动画

严格上过渡并不算是真正意义上自由的动画，因为它只是初始状态过渡到了最终状态的一个过程。可以理解为只有两个节点。

CSS3的 animation 样式提供了**关键帧**动画，通过关键字 **@keyframes** 配合 **animation** 可以设置多个节点（可理解为帧数）来精确控制一个或一组动画，常用来实现复杂的动画效果。

| 样式                           | 说明                                                      |
| ------------------------------ | --------------------------------------------------------- |
| animation-name                 | 指定动画名称                                              |
| animation-duration             | 设置动画的总耗时，单位为s                                 |
| animation-iteration-count      | 设置动画播放的次数，参数为数字或infinite（无穷），默认为1 |
| animation-direction: altermate | 设置交替动画，alternate属性代表来回交替                   |
| animation-delay                | 设置延迟，单位为s                                         |
| animation-timing-function      | linear 设置匀速                                           |
| animation-play-state           | 设置动画播放的状态，running是播放，paused是暂停           |

**animation-fill-mode:**

设置动画结束时的状态，它有三种属性：

（1）**forwards**:会保留动画结束时的状态，在有延迟的情况下，并不会立刻进行到动画的初始状态
（2）**backwards**:不会保留动画结束时的状态，在添加了动画延迟的前提下，如果动画有初始状态，那么会立刻进行到初始状态
（3）（默认）**both**:会保留动画的结束时状态，在有延迟的情况下也会立刻进入到动画的初始状态



@keyframes

@keyframes 指定动画的关键帧，用百分比来将动画分成多个节点（其中0%可用 from 代替，100%可用 to 代替）。我们来看一段它的代码：

```css
@keyframes flash_name{
	from{}
	50%{}
	to{}
}
```

其中 **flash_name** 就是指定的动画名称，它与 **animation-name** 对应。而from{}、50%{}、to{}表示三个节点，可分别在三个节点中添加样式。

## 案例

使用animation动画和transform移动实现无缝的图片滚动：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		ul,li{
			list-style: none;
		}
		div{
			width: 800px;
			height: 150px;
			margin: 100px auto;
			overflow: hidden;
		}
		ul{
			width: 200%;
			animation-name: move;
			animation-duration: 4s;
			animation-iteration-count: infinite;
			/* animation-direction: alternate; */
			animation-timing-function: linear;
			animation-fill-mode: backwards;
		}
		div:hover ul{
			animation-play-state: paused;
		}
		li{
			float: left;
		}
		img{
			width: 200px;
			height: 150px;
		}
		@keyframes move{
			from{
				transform: translateX(0px);
			}
			to{
				transform: translateX(-800px);
			}
		}
	</style>
</head>
<body>
	<div class="box">
		<ul>
			<li><a href=""><img src="./onepiece.jpg" ></a></li>
			<li><a href=""><img src="./huoying.jpeg" ></a></li>
			<li><a href=""><img src="./reborn1.jpg" ></a></li>
			<li><a href=""><img src="./jinji.jpg" ></a></li>
			<li><a href=""><img src="./onepiece.jpg" ></a></li>
			<li><a href=""><img src="./huoying.jpeg" ></a></li>
			<li><a href=""><img src="./reborn1.jpg" ></a></li>
			<li><a href=""><img src="./jinji.jpg" ></a></li>
		</ul>
	</div>
</body>
</html>
```



## animation 动画库

animate.css 是CSS3的一个动画库，我这里先贴上一个 [animate.css网址](https://daneden.github.io/animate.css/)。可以通过这个网址下载 animate.css，也可以查看它的使用说明，甚至能对库里的动画效果进行演示。

animate.css 动画库的使用我自己认为还是很简单的，毕竟就是一个包含了很多动画效果的 css 文件，很好理解。在使用的时候，我简单地将其分为三步：

（1）调用库：

```html
<link rel="stylesheet" type="text/css" href="animate.css"/>
```

（2）添加类：

在 animate.css 中，每种动画都用不同类名区分，若我们想要对某个元素添加某种动画效果，就只需要给这个元素添加对应的类名（注意在通过类名选择动画时，类名除了动画效果本身的类名外，还要有个 **animated** 类名）即可。

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

我们可以自行更改库中的动画的一些参数，比如我嫌上例中 shake 动画摇得太快了，就可以在css样式中将他的 animation-duration 改得大一点：

```css
#demo{
	animation-duration: 5s;
}
```



# `calc()`

`calc`函数是`css3`新增的功能，可以使用`calc()`计算`border、margin、pading、font-size`和width等属性设置动态值

```css
#div1 {
    position: absolute;
    left: 50px;
    width: calc( 100% / (100px * 2) );
    /* 兼容写法 */
    width: -moz-calc( 100% / (100px * 2) );
    width: -webkit-calc( 100% / (100px * 2) );
    border: 1px solid black;
}
```

**注意点：**

- 需要注意的是，运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`;
- `calc()`函数支持 `"+"`, "`-"`, `"*"`, `"/"` 运算;
- 对于不支持 `calc()`的浏览器，整个属性值表达式将被忽略。不过我们可以对那些不支持`calc()`的浏览器，使用一个固定值作为回退。

# 11 background 的使用

## background-color

添加背景色

## background-image

如果图片大于容器，默认图片从容器左上角原大小放置；

如果图片小于容器，默认图片原大小平铺

```
background-image: url("abc.jpg");
```

## background-repeat

设置背景**平铺**的方式：

**round**：将图片进行缩小后平铺

**space**：将图片间距放大后平铺

```
background-repeat：round;
```

## background-attachment

滚动页面时：

fixed：背景图片的位置固定不变

scroll：背景也会跟着滚动

 

滚动背景容器上的内容时：

fixed：背景图片不会跟随内容一起滚动

scroll：背景图片不会跟随内容一起滚动

local：背景图片会跟随内容一起滚动

## background-size

设置背景图片的大小：

100px 100px：设置宽度为100px，高度为100px；

100px auto：设置宽度为100px，高度等比例自适应；

50% 50%：设置百分比，参照父容器的内容区域宽高；

## background-size: contain

使容器包含背景图片，即背景图片需要完全在容器内显示出来，因此往往造成容器有空白区域，有两种情况：

1. 当背景图片比容器大时，图片会被等比例缩小；

2. 当背景图片比容器小时，图片会被等比例放大；

## background-size: cover

使背景图片覆盖整个容器，即整个容器不能有空白区域，因此往往造成图片溢出，有两种情况：

1. 当背景图片比容器大时，背景图片会被等比例缩小，填满整个容器；

2. 当背景图片比容器小时，背景图片会被等比例放大，填满整个容器；

## background-positon

设置背景的位置偏移，默认是以左上角作为原点，原点可通过 background-origin 改变

## background-origin

设置背景坐标的原点：

1. border-box:从border的位置开始填充背景，会与border重叠
2. padding-box:从padding的位置开始填充背景，会与padding重叠
3. content-box:从内容的位置开始填充背景

## background-clip

设置显示的内容：

1. border-box:其实是显示border及以内的内容
2. padding-box:其实是显示padding及以内的内容
3. content-box:其实是显示content及以内的内容

## background-position 案例

background-position 的用法很实用，比如之前我做一个轮播图的左右切换按钮：

![轮播按钮](./images/HTML5+CSS3/轮播按钮.png)

做法简单来说就先设置容器宽高，然后用 background-image 插入背景，再通过background-position 来取我想要的那一部分。

那如果我现在要实现的是扩大按钮的响应范围，但是按钮图案本身不扩大呢？也就是说，我想要实现这个按钮：

![移动端轮播按钮](./images/HTML5+CSS3/移动端轮播按钮.png)

按钮周围的可响应区域扩大了，毕竟有时候一个图案按钮实在是太小了，用户在点击的时候不一定能准确点击到，PC端的还能忍受，但是在移动端就很坑人了。那么这个效果怎么实现呢？

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

即在a标签里面再加一个div标签。这样子虽然也能实现我想要的效果，但是它使得页面的层次结构增多了。我们可以使用 background-origin、background-clip 来实现同样的效果：

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

可以发现，不仅HTML的层次结构没有增加，而且CSS代码也少了很多。



# 12 边框图片

## border-image-source

制定边框图片的路径

## border-image-slice

指定四个方向上的裁切距离，如下图设置siice值为x，将图片裁切成一个九宫格：

![边框图片slice](./images/HTML5+CSS3/边框图片slice.png)

而border-image-slice: x fill; 中fill用于对内容进行填充。

## border-image-width

设置边框图片的宽度，如果没有这个属性，则边框图片的默认宽度为容器border宽度。

注意边框图片本质上是背景，对容器内容的放置不会有影响，容器内容只受 border 和 padding 影响。**因此，一般来说会把容器 border 与边框图片的宽度 border-image-width 设为相同值。**

## border-image-outset

扩展边框

## border-image-repeat

1. 默认为stretch，拉伸；

2. repeat：按大小平铺；

3. round：将内容缩放，进行完整的平铺



## border-image案例

我们在聊天发QQ或微信的时候，发过去的消息框是这样的：

![QQ聊天框](./images/HTML5+CSS3/QQ聊天框.png)

可见，背景会随着我们文字的增多而变宽或变长。但是，它的实现并不是一种变大的效果（变大往往会失真），我们可以看出四个圆角是没有变化的，我们说这四个区域是受保护的。

下面我们来模拟一下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
 
        div{
            width: 150px;
            height: auto;
            border: 10px solid red;
            margin:100px auto;
	    	padding: 10px;
            color: #fff;
            /*添加边框图片*/
            border-image-source: url("abc.gif");
            /*设置受保护的区域大小*/
            border-image-slice: 10 fill;
            border-image-width: 10px;
            /*设置背景平铺效果  默认是stretch：拉伸*/
            border-image-repeat: stretch;
        }
    </style>
</head>
<body>
	<div class="div1">这里的字没那么多</div>
	<div class="div2">
		这里有好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多好多字
	</div>
</body>
</html>
```

实现效果如下：

![模拟聊天框](./images/HTML5+CSS3/模拟聊天框.png)





















# 17 多列布局

1. column-count

   设置列数

2. column-rule

   设置列间隙样式（和边框的样式一样）

3. column-gap：

   设置列间隙大小

4. column-width：

   设置列宽，遵循取大优先原则，即：
   - 如果column-width比默认计算的宽度要大，则取column-width，但此时若有空余空间，则会将宽度撑大被填满，意味着最终的宽度可能大于colum-width

   - 如果column-width更小，则取默认计算的宽度

5. max-height：

   设置每一列的最大高度，若内容超过这个高度，则换列，意味着列数可能会大于column-count

6. column-span：

   设置跨列显示：

   - 1：不跨列

   - all：跨列



# 18 伸缩盒子（弹性盒子）

传统的布局方式基于盒子模型，依赖于 display、position 和 float 等。CSS3新增了伸缩布局，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。

1. **display: flex**：一个容器设置了 display: flex 属性，则容器内的**直接子元素**都会自动变成**伸缩项（flex item）**

2. **justify-content：设置子元素在主轴方向上的排列方式**

    | 属性              | 说明                                                         |
    | ----------------- | ------------------------------------------------------------ |
    | flex-start        | 让子元素从父元素的起始位置开始排列                           |
    | flex-end          | 让子元素从父元素的结束位置开始排列                           |
    | center            | 让子元素从父元素的中间位置开始排列                           |
    | **space-between** | 左右对齐父元素的开始和结束位置，中间的平均放置，使得各子元素间距相同 |
    | **space-around**  | 将留白平均分给每个子元素的两边，相当于margin: 0 auto;        |

3. **flex-wrap：控制子元素是否换行显示：**

   | 属性         | 说明                                           |
   | ------------ | ---------------------------------------------- |
   | nowrap       | 不换行（收缩），默认                           |
   | wrap         | 换行                                           |
   | wrap-reverse | 换行且翻转（即从上到下换行翻转为从下到上换行） |

4. **flex-direction：设置子元素的排列方向（设置主轴方向）：**

   | 属性           | 说明               |
   | -------------- | ------------------ |
   | row            | 水平方向，从左到右 |
   | row-reverse    | 水平方向，从右到左 |
   | column         | 垂直方向，从上到下 |
   | column-reverse | 垂直方向，从下到上 |

5. **flex-flow：是 flex-wrap 和 flex-direction 的结合。**如 flex-wrap: wrap; flex-direction: row; 相当于 flex-flow: wrap row;

6. **flex-grow：当有留白时，设置当前子元素应占据留白的比例值，用来扩展子元素的宽度。**（默认为0，即默认情况下子元素不会去占据剩余空间）----写在子元素

   ```
   比例计算：当前子元素的 flex-grow 值 / 当前子元素的全部兄弟元素（包括当前子元素在内）的全部 flex-grow 总和。
   ```

   

7. **flex-shrink：当父容器不足以容纳所有子元素时，定义子元素收缩比例。**（默认为1，即默认情况下，子元素会平均收缩）----写在子元素

   ```
   比例计算：当前子元素的 flex-shrink 值 / 当前子元素的全部兄弟元素（包括当前子元素在内）的全部 flex-shrink 总和。
   ```

   

8. **flex：flex 是 flex-grow  flex-shrink flex-basis 的简写。**默认值为 flex:0 1 auto;

   语法：

   ```
   flex: number：这个语法指定了一个数字，代表了这个伸缩项目该占用的剩余空间比例
   flex: auto：属性值被设为auto的伸缩项目，会根据主轴自动伸缩以占用所有剩余空间
   ```

9. **align-items：设置子元素在侧轴方向上的对齐方式（写在父元素）**

   | 属性       | 说明           |
   | ---------- | -------------- |
   | center     | 侧轴上居中对齐 |
   | flex-start | 侧轴顶部对齐   |
   | flex-end   | 侧轴底部对齐   |
   | stretch    | 侧轴上拉伸     |
   | baseline   | 设置文本基线   |

10. **align-self：设置单个元素在侧轴上的对齐方式**

## 案例

下面我就用伸缩布局实现下图的这个网页布局：

![](./images/HTML5+CSS3/伸缩布局网页.png)

代码如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			*{
				padding: 0;
				margin: 0;
			}
			.box{
				width: 100%;
				height: 700px;
				background-color: #ccc;
				margin: 10px auto;
				/* 将整个容器设为伸缩盒子 */
				display: flex;
				flex-direction: column;
			}
			header{
				width: 100%;
				height: 100px;
				background-color: salmon;
			}
			footer{
				width: 100%;
				height: 100px;
				background-color: skyblue;
			}
			main{
				width: 100%;
				background-color: sandybrown;
				/* 让当前的main元素占据全部剩余空间 */
				flex: 1;
				/* 设置main为伸缩盒子 */
				display: flex;
			}
			main > article{
				width: 500px;
				background-color: bisque;
				/* 让article占据5/6 */
				flex: 5;
			}
			main > aside{
				/* 让aside占据1/6 */
				flex: 1;
				background-color: #FF6700;
			}
			ul{
				list-style: none;
				width: 100%;
				/* 将ul设置为伸缩盒子 */
				display: flex;
			}
			li{
				height: 50px;
				background-color: springgreen;
				border-right: 1px solid #ccc;
				line-height: 50px;
				text-align: center;
				/* 让每个li平均占据 */
				flex: 1;
			}
			li:last-of-type{
				border-right: none;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<header></header>
			<main>
				<article>
					<ul>
						<li>动漫首页</li>
						<li>番剧列表</li>
						<li>国剧经典</li>
						<li>日漫经典</li>
						<li>七月新番</li>
					</ul>
				</article>
				<aside></aside>
			</main>
			<footer></footer>
		</div>
 
	</body>
</html>
```

实现效果如下：

当缩放容器宽高时，容器内的子元素会按比例伸缩。

且在去动漫菜单中的某一项或几项时，剩下的菜单项会自动平均占据空间。

![](./images/HTML5+CSS3/伸缩网页实现.png)



# 19 响应式开发

## 19.1 什么是响应式开发

​		现在的设备（特别是移动设备），各种尺寸层出不穷，一个能在PC端完美展示的站点，放在移动端可能就会“形象坍塌”。一个能在iphone5完美展示的站点，放在iPhone11也会“不堪入目”。响应式开发应运而生，它说白了就是做出来一个网站，可以兼容不同大小的设备（这里说的大小更多指的是设备的宽度），可以通过“媒体查询”检测设备信息，来设置不同的CSS样式，决定不同的网页布局方式。总而言之，就是为了用户体验，让网站对不同设备做出不同响应。



## 19.2 网页布局方式

​		在开发中，我们常用到以下的一些网页的布局方式：（几种布局方式并不是独立存在的，实际开发过程中往往是相互结合使用的。）

| 网页布局       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| 固定宽度布局   | 为网页设置一个固定的宽度，通常以px做为长度单位，常见于PC端网页。 |
| 流式布局       | 为网页设置一个相对的宽度，通常以百分比做为长度单位。         |
| 栅格化布局     | 将网页宽度人为的划分成均等的长度，然后排版布局时则以这些均等的长度做为度量单位，通常利用百分比做为长度单位来划分成均等的长度。 |
| **响应式布局** | 通过检测设备信息，决定网页布局方式，即用户如果采用不同的设备访问同一个网页，有可能会看到不一样的内容，一般情况下是检测设备屏幕的宽度来实现。 |



## 19.3 响应式开发原理——媒体查询

​		在响应式布局中，怎么做到检测设备信息？我们利用媒体查询可以检测到屏幕的尺寸（主要检测宽度），并设置不同的CSS样式，就可以实现响应式的布局。

### 媒体查询的CSS语法

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

也可以针对不同的媒体引入不同的.css外部文件：

```html
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

### mediatype（媒体类型）

| 媒体类型   | 说明                                   |
| ---------- | -------------------------------------- |
| all        | 用于所有设备                           |
| print      | 用于打印机和打印预览                   |
| **screen** | **用于电脑屏幕，平板电脑，智能手机等** |
| speech     | 应用于屏幕阅读器等发声设备             |

### media feature（媒体功能）

| 媒体功能          | 说明                                 |
| ----------------- | ------------------------------------ |
| device-height     | 定义输出设备的屏幕可见高度           |
| device-width      | 定义输出设备的屏幕可见宽度           |
| max-device-height | 定义输出设备的屏幕可见的最大高度     |
| max-device-width  | 定义输出设备的屏幕最大可见宽度       |
| min-device-width  | 定义输出设备的屏幕最小可见宽度       |
| min-device-height | 定义输出设备的屏幕的最小可见高度     |
| max-height        | 定义输出设备中的页面最大可见区域高度 |
| max-width         | 定义输出设备中的页面最大可见区域宽度 |
| min-height        | 定义输出设备中的页面最小可见区域高度 |
| min-width         | 定义输出设备中的页面最小可见区域宽度 |

在媒体功能中，**min-width** 和 **min-device-width** 有什么区别呢？

device是设备的意思，我们知道在移动端适配中，往往会将width和device-width画上等号，即：

```html
<meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

实际上，min-width 它是指当前可视区域（页面）的最小宽度，因此当我们改变页面宽度时，pc端和移动端都能正常地做出响应，效果一致。

而 min-device-width 是指输出设备的屏幕宽度。移动端我们知道 width=device-width，而PC端当拖动来改变浏览器大小的时候，当前PC终端设备的屏幕宽度并不会变化，意味着媒体查询条件不会响应。

因此，可以认为 min-device-width 以及其它加 device 的媒体功能只对移动终端有效。

### 媒体查询书写建议

1）如果是判断最小值 (min-width)，那么就应该按照宽度从小到大写——bootstrap框架就是判断最小值，从小到大写：

```css
@media screen and (min-width:768px){
	body{
		background-color: blue;
	}
}
@media screen and (min-width:992px){
	body{
		background-color: green;
	}
}
@media screen and (min-width:1200px){
	body{
		background-color: pink;
	}
}
```

之所以要这么写原因很简单，我们来实现一个案例，案例需求如下：

| 宽度         | background-color |
| ------------ | ---------------- |
| <768px       | red              |
| 768px~992px  | blue             |
| 992px~1200px | green            |
| >1200px      | pink             |

媒体查询正确的书写顺序如上，以下是错误的顺序代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title></title>
		<style>
			body{
				background-color: red;
			}
			@media screen and (min-width:1200px){
				body{
					background-color: blue;
				}
			}
			@media screen and (min-width:992px){
				body{
					background-color: green;
				}
			}
			@media screen and (min-width:768px){
				body{
					background-color: pink;
				}
			}
		</style>
	</head>
	<body>
		
	</body>
</html>
```

你会发现，实现结果为：改变页面宽度大于768px时，background-color 为粉色，并且不论怎么调大宽度，background-color 都为粉色。这正是因为媒体查询顺序书写错误造成的BUG。

媒体查询从上到下判断条件时，如果处在下面的媒体查询条件也满足，则会把上面的满足条件的媒体查询样式覆盖。

（2）如果是判断最大值 (max-width)，那么就应该从大到小写：（原因与min-width情况类似，稍微想一下就能知道了）

```css
@media screen and (max-width:1200px){
	body{
		background-color: pink;
	}
}
@media screen and (max-width:992px){
	body{
		background-color: green;
	}
}
@media screen and (max-width:768px){
	body{
		background-color: blue;
	}
}
```





# 20 BFC

`BFC`即`block formatting context`,块级格式化上下文,是一个独立的渲染区域,处于`BFC`内部的元素与外部的元素相互隔离,使内外元素的定位不会互相影响.

## 20.1 触发条件

1. 根元素<html>
2. `position`为`absolute`或`fixed`
3. `display`为`inline-block`或`table`
4. `float`不为`none`
5. `overflow`不为`visible`

## 20.2 规则

## 20.3 应用

1. 边距重叠问题

   ```html
   <div class="box box1"></div>
   <p>
       <div class="box box2"></div>
   </p>
   ```

   将第二个`div`用一个`p`标签包裹,并且给`p`标签设置`overflow:hidden`

   ```css
   .box {
       width: 100px;
       height: 100px;
       background: red;
   }
   .box1 {
       margin-bottom: 10px;
   }
   p {
       overflow: hidden;
   }
   .box2 {
       margin-top: 10px;
   }
   ```

2. 盒子塌陷问题

   ```html
   <div class="father">
       <div class="son"></div>
   </div>
   ```

   ```css
   .father {
       width: 200px;
       height: 200px;
       background: red;
   }
   .son {
       width: 100px;
       height: 100px;
       background: yellow;
       margin-top: 20px;
   }
   ```

   给子盒子设置`margin-top`,会发现父盒子跟着塌陷.

   解决方式是创建`BFC`,将父盒子设置为独立渲染区域:

   ```css
   .father {
       width: 200px;
       height: 200px;
       background: red;
       overflow: hidden;
   }
   ```

3. 清除浮动

   ```html
   <div class="father">
       <div class="son"></div>
       <div class="son"></div>
   </div>
   <div class="mother"></div>
   ```

   ```css
   .son {
       width: 100px;
       height: 100px;
       background: yellow;
       float: left;
   }
   ```

   给`son`添加`float`,会使得盒子脱离文档流,导致`mother`被覆盖

   解决方式是创建`BFC`,将`father`设置为独立渲染区域:

   ```css
   .father {
       overflow: hidden;
   }
   .son {
       width: 100px;
       height: 100px;
       background: yellow;
       float: left;
   }
   .mother {
       width: 200px;
       height: 200px;
       background: red;
       /*overflow: hidden;*/
       /*注意,给father添加overflow,和给mother添加overflow是不同的*/
       /*前者是将father设置为独立渲染区域,*/
   }
   ```

4. 浮动环绕文字问题

   ```html
   <div class="father">
       <div class="box"></div>
       <div class="msg">文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊文字啊</div>
   </div>
   ```

   ```css
   .father {
       width: 200px;
       height: 200px;
       background: yellow;
   }
   .box {
       width: 100px;
       height: 100px;
       background: red;
       float: left;
   }
   ```

   给`box`添加浮动,此时`msg`的文字会环绕`box`

   解决方式是创建`BFC`,将`msg`设置为独立渲染区域:

   ```css
   .msg {
   	overflow: hidden;
   }
   ```




# 21 层叠上下文(`Stack Context`)

## 21.1 创建层叠上下文

满足以下条件之一的元素会创建一个层叠上下文:(需要特别记忆的已经加粗)

1. **文档根元素<html>**;
2. **`position`值为`absolute`或`relative`,且`z-index`值不为`auto`;**
3. **`position`值为`fixed`或`sticky`的元素(粘滞定位适配所有移动设备上的浏览器,但老的桌面浏览器不支持);**
4. **`flex`容器的子元素,且`z-index`值不为`auto`;**
5. `grid`容器的子元素,且`z-index`值不为`auto`;
6. **`opacity`属性值小于1的元素;**
7. `mix-blend-mode`属性值不为`normal`的元素;
8. 以下任意属性值不为`none`的元素:
   - **`transform`**
   - `filter`
   - `perspective`
   - `clip-path`
   - `mask`/`mask-image`/`mask-border`
9. `isolation`属性值为`isolate`的元素;
10. `-webkit-overflow-scrolling`属性值为`touch`的元素;
11. `will-change`值设定了任一属性而该属性在`non-initial`值时会创建层叠上下文的元素;
12. `contain`属性值为`layout`,`paint`或包含他们其中之一的合成值(比如`contain:strict`,`contain:content`)的元素.

## 21.2 层叠等级

著名的七阶层叠水平(`stacking level`):

- 正值`z-index`
  - `z-index: auto`或看成`z-index: 0`
    - `inline/inline-block`水平盒子
      - `float`浮动盒子
        - `block`块状水平盒子
          - 负值`z-index`
            - 层叠上下文`background/border`

## 21.3 `z-index`

1. `z-index`只对`position`不为`static的属性有效`,默认情况下`z-index:auto`;

2. `z-index: auto`和`z-index: 0`虽然在同一个层叠面,但是意义不同:

   ```html
   <div class="box_1">1
       <div class="box_1_1"></div>
   </div>
   <div class="box_2">2</div>
   ```

   ```css
   .box_1 {
       width: 200px;
       height: 200px;
       background: coral;
       position: relative;
       z-index: auto;
       /* z-index: 0; */
   }
   .box_1_1 {
       width: 150px;
       height: 150px;
       background: blue;
       position: absolute;
       z-index: 100;
   }
   .box_2 {
       width: 200px;
       height: 200px;
       background: aquamarine;
       position: absolute;
       left: 100px;
       top: 100px;
   }
   ```

   如上,将`box_1`的`z-index`设置为`auto`和`0`,会得到不同的结果:

   前者是默认样式,并不会创建层叠上下文,此时`box_1_1`会遮盖`box_2`;

   后者是设置`box_1`的`z-index`,配合`position: relative`,会创建一个`stack context`,`box_1_1`作为该层叠上下文的子元素,此时无论给`box_1_1`设置多大的`z-index`都不会遮盖`box_2`(不在同一个`stack context`)

3. `z-index: 10`一定在`z-index: 5`上面吗?

   答案是否定的.同一个`stack context`中`z-index`越大越在上面.但是如果两个元素不在同一个`stack context`,那相当于他们不在同一个世界,不在同一个世界的两个元素`z-index`无法比较.

4. 如果父级元素无定位属性,子级元素有定位属性,那么此时`z-index`为负值的元素在父级的`background`下面:

   ```html
   <div class="box_1">1
       <div class="box_1_1"></div>
   </div>
   ```

   ```css
   .box_1 {
       width: 200px;
       height: 200px;
       background: coral;
   }
   .box_1_1 {
       width: 150px;
       height: 150px;
       background: blue;
       position: absolute;
       z-index: -100;
   }
   ```

   如果父级元素有定位属性,那么此时`z-index`为负值的元素在父级的`background`上面:

   ```css
   .box_1 {
       width: 200px;
       height: 200px;
       background: coral;
       position: relative;
   }
   .box_1_1 {
       width: 150px;
       height: 150px;
       background: blue;
       position: absolute;
       z-index: -100;
   }
   ```

   

# `<link>`与`@import`的区别

| 不同     | `<link>`                                                     | `@import`               |
| -------- | ------------------------------------------------------------ | ----------------------- |
| 使用场景 | `HTML`和`XHTML`的标签                                        | `css`提供的引入方式     |
| 功能     | 除了可以加载`css`,还可以做其他事情,如定义`RSS`,定义`rel`链接属性等 | 只用于加载`css`         |
| 解析顺序 | 页面加载时同步解析                                           | 页面加载完成后加载      |
| 兼容性   | 通用                                                         | 需要`IE5`以上才可以使用 |
| 动态引入 | 可以使用`js`动态引入                                         | 不能使用`js`动态引入    |



# 











