## 行内元素、块级元素、行内块元素

首先明确行内元素`inline`、块级元素`block`、行内块元素`inline-block`的区别和联系。

|          | 行内元素                                                     | 块级元素                                                     | 行内块元素                           |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------ |
| 放置方式 | 与其他行内元素位于同一行                                     | 每个块元素独占一行<br />（除非用一些方法来脱离文档流，如浮动 `float `或定位） | 与其他行内元素或行内块元素位于同一行 |
| 宽高设置 | 不可以自定义宽高，只能通过文本或图片来决定宽高               | 可以自定义宽高，<br />如果宽度不设置，默认为父容器的宽度<br />（即` width: 100%`） | 可以自定义宽高                       |
| 间距设置 | 左右间距可以设置，但是顶部和底部的间距不可设置               | 上下左右的间距都可以设置                                     | 上下左右的间距都可以设置             |
| 常见元素 | `span、img、a、label、input、abbr（缩写）`<br /> `em（强调）、big、cite（引用）、i（斜体）`<br /> `q（短引用）、textarea、select、small`<br /> `sub、sup，strong、u（下划线）、button` | `div、p、h1~h6、ul、ol、dl、li、dd、`<br /> `table、hr、blockquote、address、table`<br /> `menu、pre，HTML5新增的header、section、aside、footer等` |                                      |

在`CSS`中，我们可以通过`display`对这三种元素进行转换：

| 样式                     | 说明             |
| ------------------------ | ---------------- |
| `display: block;`        | 设置为块级元素   |
| `display: inline;`       | 设置为行内元素   |
| `display: inline-block;` | 设置为行内块元素 |



## 水平居中

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



## 	垂直居中

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



## 水平-垂直居中

1. **不定高:**

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

2. **定高**

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



## 伸缩盒子的对齐方式

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

