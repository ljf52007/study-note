`BFC`即`block formatting context`,块级格式化上下文,是一个独立的渲染区域,处于`BFC`内部的元素与外部的元素相互隔离,使内外元素的定位不会互相影响.

## 触发条件

1. 根元素`<html>`
2. `position`为`absolute`或`fixed`
3. `display`为`inline-block`或`table`
4. `float`不为`none`
5. `overflow`不为`visible`

## 规则

## 应用

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

   

