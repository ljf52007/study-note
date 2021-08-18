Angular每个视图都有一个状态，根据视图的状态值来决定是否执行该视图及其子视图的变更检测。

常见状态如下：（可以同时存在多个状态值）

1. FirstCheck
2. ChecksEnabled --- false时将跳过 view 和子 view 的变更检测
3. Errored --- 跳过 view 和子 view 的变更检测
4. Destroyed --- 跳过 view 和子 view 的变更检测



ViewRef --- 用来操作视图，封装了基础组件视图和 detectChanges 方法

发生异步事件时，Angular 会在最顶层的 ViewRef 上触发变更检测，执行完后会为其子视图执行变更检测

使用 --- 在 constructor 注入：

```JavaScript
export class AppConponent {
    constructor(cdf: ChangeDetectorRef) {
        ...
    }
}
```



负责为视图执行变更检测的主要逻辑位于 checkAndUpdateView 函数中，它的大多数功能都在子组件视图上执行操作——从主组件开始为每个组件递归调用此函数。它是执行变更检测的主要函数，当针对 view 触发此函数时，它将按顺序执行：

1. 设置 ViewState.firstCheck，首次检查View为 true，非首次为false
2. 检查并更新子组件/指令实例上的输入属性
3. 更新子视图的变更检测状态（变更检测策略实现的一部分）
4. 对 embedded views（内嵌视图）进行变更检测（重复该列表的过程）
5. 如果绑定改变，调用子组件的 onChanges 生命周期钩子
6. 调用子组件的 onInit（仅在第一次检测时被调用）和 ngDoCheck
7. 更新子视图组件上的 ContentChildren 查询列表
8. 调用子组件的 AfterContentInit（仅在第一次检查时调用）和 AfterContentChecked
9. 如果当前视图组件实例上的属性已更改，则为当前视图更新DOM插值
10. 对子视图进行变更检测（重复该列表过程）
11. 更新当前视图组件实例的 ViewChildren 查询列表
12. 调用 AfterViewInit（仅在第一次检查时调用）和 AfterViewChecked
13. 禁用对当前视图的检查（变更检测策略实施的一部分）



如果具有以下组件树

```
ComponentA
    ComponentB
        ComponentC
```

挂钩调用和绑定更新的顺序如下：

```
A:AfterContentInit
A:AfterContentChecked
A:Update bindings
	B:AfterContentInit
	B:AgterContentChecked
	B:Update bindings
		C:AfterContentInit
		C:AfterContentChecked
		C:Update bindings
		C:AfterViewInit
		C:AfterViewChecked
	B:AfterViewInit
	B:AfterViewChecked
A:AfterViewInit
A:AfterViewChecked
```

组件变更检测的三大核心操作：

1. 更新子组件的输入绑定
2. 更新DOM插值
3. 更新查询列表

除了这些核心操作外，Angular还会触发生命周期挂钩，作为变更检测的一部分。

在检测父组件时，会触发子组件的挂钩。当Angular运行变更检测时，操作顺序如下：

```
Checking A component:
  - update B input bindings
  - call NgDoCheck on the B component
  - update DOM interpolations for component A
 
 Checking B component:
    - update C input bindings
    - call NgDoCheck on the C component
    - update DOM interpolations for component B
 
   Checking C component:
      - update DOM interpolations for component C
```

这里只列出了一个简易的操作列表，目的是更好的理解 NgDoCheck 的执行时间。假设我们为组件B实施 OnPush 策略：

```
Checking A component:
  - update B input bindings
  - call NgDoCheck on the B component
  - update DOM interpolations for component A
  
 if (bindings changed) -> checking B component:
    - update C input bindings
    - call NgDoCheck on the C component
    - update DOM interpolations for component B
 
   Checking C component:
      - update DOM interpolations for component C
```

如上可见，如果不满足 bindings changed 的条件，将不会执行操作 checking B component。但是即便如此，component B 的 NgDoCheck 依然会触发。

需要注意的是，此时 component B 的子组件（component C）的 NgDoCheck 钩子将不会触发。



为什么需要 NgDoCheck？

Angular 是通过对象的引用来跟踪输入绑定的。也就是说，只要引用没有更改，就不会检测到绑定更改，也就不会对使用 OnPush 策略的组件执行变更检测。如以下代码，将不会检测到对象 o 的更改：

```javascript
const o = {some: 3};

$scope.$watch(
  () => {  return o;},
  () => {  console.log('changed'); } // nothing is logged
);

$timeout(() => {  o.some = 4; }, 2000);
```

因此，在 Angular 中，如果要跟踪对象或数组的改变，就需要手动让 Angular 知道，以便即使对象引用未更改，它也能对组件执行变更检测。

来看下面的例子：

父组件App：该组件将对象 o 传递给子组件。在两秒后更新对象 o 的 name 和 id 属性来使更改对象。

```JavaScript
@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <a-comp [o]="o"></a-comp>
  `,
})
export class App {
  name = `Angular! v${VERSION.full}`;
  o = {id: 1, name: 'John'};

  ngOnInit() {
    setTimeout(() => {
      this.o.id = 2;
      this.o.name = 'Jane';
    }, 2000);
  }
}
```

子组件A：使用 ngDoCheck 生命周期钩子来检测对象是否更改，并使用 markForCheck 方法通知 Angular。

```JavaScript
@Component({
  selector: 'a-comp',
  template: `<h2>The name is: {{o.name}}</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AComponent {
  @Input() o;

  // store previous value of `id`
  id;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    // every time the object changes 
    // store the new `id`
    this.id = this.o.id;
  }

  ngDoCheck() {
    // check for object mutation
    if (this.id !== this.o.id) {
      this.cd.markForCheck();
    }
  }
}
```

