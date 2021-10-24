`computed`和`methods`,`watch`有什么区别

`computed`和`watch`内部都是通过`Watcher`实现的,

`computed`具备缓存功能,只有当依赖的属性发生变化时才会更新视图

做了一个`dirty`,实现了缓存的机制

 依赖的数据发生变化时,会让计算属性的`watcher`

`lazy`:计算属性`computed`的标识

