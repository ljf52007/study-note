| 过渡样式                     | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `transition-property`        | 添加过渡效果的样式属性名称                                   |
| `transition-duration`        | 过渡效果的耗时，以秒`s`作为单位                              |
| `transition-timing-function` | 过渡时间函数，控制过渡的速度，匀速是`linear`                 |
| `transition-delay`           | 过渡效果的延迟，默认为`0s`                                   |
| `step(x)`                    | 把过渡分为指定的 `x` 步进行                                  |
| 简写                         | `transition: property duration timing-function delay step(4);` |

注意：

（1）过渡效果执行完毕之后，默认会还原到原始状态

（2）**过渡效果只能产生从某个值到另外一个具体的值的过渡，例如它无法从 `display: none`过渡到 `display: block` ，可以从 `height: 0px` 过渡到`height: 10px`。**

（3）过渡存在一些兼容性的问题，最好添加前缀，如

    -moz-transition
    -webkit-transition
    -o-transition

