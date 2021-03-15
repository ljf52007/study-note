## 组件和模板

### 显示数据

### 模板语法

#### 模板表达式

- `<script>` 元素，它被禁用了，以阻止脚本注入攻击的风险。（实际上，`<script>`只是被忽略了。） 

- 有些合法的 HTML 被用在模板中是没有意义的。`<html>`、`<body>` 和`<base>` 元素这个舞台上中并没有扮演有用的角色。剩下的所有元素基本上就都一样用了。

- 插值表达式、模板表达式

- 模板表达式不能引用全局命名空间中的任何东西，比如 `window` 或 `document`。它们也不能调用 `console.log` 或 `Math.max`。 它们只能引用表达式上下文中的成员。

- 表达式上下文

  1. 典型的表达式上下文就是这个组件实例，它是各种绑定值的来源

     ```html
     <h4>{{data}}</h4>
     <img [src]="srcUrl">
     ```

  2. 表达式也可以引用模板中的上下文属性，例如模板输入变量
     ```html
     <ul>
       <li *ngFor="let customer of customers">{{customer.name}}</li>
     </ul>
     ```
     ```html
     <label>Type something:
       <input #customerInput>{{customerInput.value}}
     </label>
     ```
     表达式中的上下文变量的优先顺序为：`模板变量`、`指令的上下文变量`（如果有）和`组件的成员`。如下面这个例子中就体现了这种命名冲突：组件具有一个名叫 `customer` 的属性，而 `*ngFor` 声明了一个也叫 `customer` 的模板变量。
  
   ```html
     <div>customer</div>
     <ul>
       <li *ngFor="let customer of customers">{{customer.name}}</li>
     </ul>
   ```
  
   在 `{{customer.name}}` 表达式中的 `customer` 实际引用的是模板变量，而不是组件的属性。

**当使用模板表达式时，请遵循下列指南：**

- 非常简单
- 执行迅速
- 没有可见的副作用(即模版中的逻辑不能改变组件的变量)，**幂等**的表达式是最理想的，因为它没有副作用，并且可以提高 Angular 的变更检测性能。 用 Angular 术语来说，幂等表达式总会返回*完全相同的东西*，除非其依赖值之一发生了变化。

#### 模板语句

语句上下文可以引用模板自身上下文中的属性。 在下面的例子中，就把模板的 `$event` 对象、模板输入变量 (`let hero`)和模板引用变量 (`#heroForm`)传给了组件中的一个事件处理器方法。

```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```



### 绑定语法

`Angular`中的三类绑定类型：

1. 从数据源到视图：插值、属性、`Attribute`、`css`类、样式

   ```
   {{expression}}
   [target]="expression"
   bind-target="expression"
   ```

   

2. 从视图到数据源：事件

   ```
   (target)="statement"
   on-target="statement"
   ```

   

3. 双向绑定

   ```
   [(target)]="expression"
   bindon-target="expression"
   ```



html中的attribute和dom中的property

属性绑定与插值

内容安全的处理

ngFor的trackBy

ngIf/ngFor/ngSwitch的模板写法