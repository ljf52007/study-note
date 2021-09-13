## 优先级高低

`Vue`源码`(src/compiler/codegen/index.js)`:

```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } 
    // v-for判断时机比v-if早
    else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    ...
  }
}
```

可以看到`v-for`的优先级高于`v-if`.

## 性能浪费

```html
<p v-if="isShow" v-for="item in items">{{item.name}}</p>
```

如果在同一个标签同时使用`v-for`和`v-if`,每次渲染都会先循环,再对循环的每一项逐个进行条件判断,造成性能浪费.

## 正确做法

一般分两种情况:

1. 条件判断在循环外部

   可以在标签外套一层`template`(页面渲染不生成`dom`节点)用作条件判断

   ```html
   <template v-if="isShow">
   	<p v-for="item in items">{{item.name}}</p>
   </template>
   ```

2. 条件判断在循环内部

   可以先通过计算属性对数据进行条件过滤,这样也更有利于性能:

   ```js
     computed:{
       list: function() {
         return this.items.filter(item => {
           return item.isShow
         })
       }
     }
   ```

   

