angular是一个单页面，index.html app-root

angular引入第三方插件:

1. index.html <link> <script>
2. angular.json  styles scripts只认本地文件，不请求远程文件
3. npm install  import导入 



NgModules



















































![overview2](D:\front-end-note\images\angular\overview2.png)









## 表单

`FormControl`、`FormArray`、`FormGroup`一同构成`Angular`表单三大基础功能模块。

### `FormControl`

`FormControl`追踪单个控件的值和验证状态。

#### 使用：实例化`FormControl`

1. 一个参数——传递一个`value`值

   ```js
   const ctrl = new FormControl('some value');
   console.log(ctrl.value); // 'some value'
   ```

2. 一个参数——传递一个状态对象，对象包括初始值和当前控件是否被禁用的状态。传递对象时必须同时包含`value`和`disabled`两个属性，只指定`value`的话会有意外的结果：

   ```js
   const ctrl_1 = new FormControl({
   	value: 'some value_1',
   	disabled: true
   });
   const ctrl_2 = new FormControl({
   	value: 'some value_2'
   });
   console.log(ctrl_1.value); // 'some value_1'
   console.log(ctrl_1.status); // 'DISABLED'
   console.log(ctrl_2.value); // {value: 'some value_2'}
   ```

3. 多个参数——可传入同步验证器作为第二个参数，传入异步验证器作为第三个参数：

   ```js
       const ctrl = new FormControl({value: '', disabled: false}, Validators.required;
       console.log(ctrl.value); // ''
       console.log(ctrl.status); // 'INVALID'
       console.log(ctrl.valid); // false 
   ```



#### `Class`

```js
class FormControl {
  constructor(formState?: any,
               validator?: ValidatorFn | ValidatorFn[] | null,
      		   asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);

  /*
  * 设置控件的value值
  */
  setValue(value: any, options?: {
           onlySelf?: boolean; // 默认为false，如果为true，则当前操作只会影响控件本身的验证状态，不会影响父节点
           emitEvent?: boolean; // 默认为true，当前操作会发送一个valueChanges事件
           emitModelToViewChange?: boolean; // 默认为true，当前操作会发送onChange事件通知视图
           emitViewToModelChange?: boolean; // 默认为true，当前操作会触发ngModelChange事件更新模型
           }): void;
  
  /*
  * 
  */
  patchValue(value: any, options?: {
             onlySelf?: boolean;
             emitEvent?: boolean;
             emitModelToViewChange?: boolean;
             emitViewToModelChange?: boolean;
             }): void;
  
  /*
  * 
  */
  reset(formState?: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        }): void;
  
  /*
  * 注册一个监听变化的事件监听器
  */
  registerOnChange(fn: Function) : void;
  
  /*
  * 注册一个监听控件禁用状态变化的事件监听器
  */
  registerOnDisabledChange(fn: (isDisabled: boolean) => void) : void;
}
```





### `FormArray`

### `FormGroup`

### `FormBuilder`

