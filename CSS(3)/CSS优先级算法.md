## 优先级比较

`!important` > 内联样式 = 外联样式 > `ID`选择器 > `class`选择器 = 伪类选择器 = 属性选择器 > 元素选择器 = 伪元素选择器 > 通配选择器 = 后代选择器 = 兄弟选择器 > 浏览器自定义或继承 > 默认

## 权重计算

我们把特殊性分为5个等级，每个等级代表一类选择器，每个等级的值为其所代表的选择器的个数乘以这一等级的权值，最后把所有等级的值相加得出选择器的特殊值。

5个等级的定义如下：

| 等级   | 选择器和权值                                                |
| ------ | ----------------------------------------------------------- |
| 第一等 | 代表内联样式，如: `style=””`，权值为`1000`                  |
| 第二等 | 代表`ID`选择器，如：`#content`，权值为`0100`                |
| 第三等 | 代表类，伪类和属性选择器，如`.content`，权值为`0010`        |
| 第四等 | 代表元素选择器和伪元素选择器，如`div p`，权值为`0001`       |
| 第五等 | 通配选择器`*`，子选择器`>`，相邻同胞选择器`+`，权值为`0000` |



## 渲染规则

1. 优先级不同: 优先级高的样式覆盖优先级低的样式;
2. 选择器的最高优先级相同: 计算等级的权重和,权重和高的样式覆盖权重和低的样式;
3. 优先级,权重都相同: 后写的样式覆盖前面的样式;