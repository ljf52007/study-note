#### Problem 1

工作中做到费用结算板块，要对数额进行相加时，直接相加可能会产生精度问题——

封装精确加法的函数：

```js
/**
 * 精确加法
 */
export function exactAdd(...value) {
  let count = 0;
  let max = 0;
  for (const val of value) {
    const valStr = val.toString();
    const index = valStr.indexOf('.');
    if (index > -1) {
      const num = valStr.length - 1 - index;
      max = num > max ? num : max;
    }
  }
  for (const val of value) {
    count += Math.round(val * Math.pow(10, max));
  }
  return count / Math.pow(10, max);
}
```

算法的原理是，如果加数有小数，则取小数点后的最大位数max，令加数同时乘以10的max次方，将得到的整数结果相加后，再将和除以10的max次方，得到精确的加法结果。



#### Problem 2

工作中遇到一个这样的问题，要将下面这样的数据进行条件过滤：

```json
[
	{
        rightId: 1,
    	children: [
            {
                rightId: 11,
                children: [
                    {
                        rightId: 111
                    }
                ]
            },
            {
                rightId: 12
            }
        ]
    },
	{
        rightId: 2,
    	children: []
    },
	{
        rightId: 3,
    	children: []
    },
]
```

过滤的结果是将rightId不符合条件的一项从树中剔除：

```js
  // 递归剔除
  setRightTree(nodes, parent?, index?) {
    if (nodes instanceof Array) {
      // 细节-1
      for (let i = nodes.length - 1; i >= 0; i--) {
        this.setRightTree(nodes[i], nodes, i);
      }
    } else {
      if (nodes.children) {
        // 细节-2
        for (let j = nodes.length - 1; j >= 0; j--) {
          this.setRightTree(nodes.children[j], nodes.children, j);
        }
      }
      if ((!nodes.children || nodes.children.length === 0) && !this.hasRight(nodes)) {
        // 细节-3
        parent.splice(index, 1);
      }
    }
  }

  // 过滤条件
  hasRight(nodes) {
    const currentCorp = this.userService.currentCorp;
    if (this.rightIdList.includes(nodes.key)) {
      return true;
    }
    if ((nodes.serviceDemander === currentCorp.serviceDemander && nodes.serviceDemanderCommon === 'Y') ||
      (nodes.serviceProvider === currentCorp.serviceProvider && nodes.serviceProviderCommon === 'Y') ||
      (nodes.deviceUser === currentCorp.deviceUser && nodes.deviceUserCommon === 'Y') ||
      (nodes.cloudManager === currentCorp.cloudManager && nodes.cloudManagerCommon === 'Y') ||
      nodes.extraCorpCommon === 'Y') {
      return true
    }
    return false;
  }
```

记录其中的几个细节：

1. 循环条件应该是

   ```
   let i = nodes.length - 1; i >= 0; i--
   ```

   而不是

   ```
   let i = 0; i <= nodes.length - 1; i++
   ```

   因为后面剔除项时用的是splice方法，该方法对原数组产生影响，如果从头循环，剔除项时会对后面的循环产生影响；

2. 最好用for循环，不用 forEach。

   首先是和细节-1相同，forEach 也是从头循环；

   第二是因为 forEach 的回调是异步的，因此在递归中，可能循环未结束，已经执行了往后的代码；

3. splice，如果只传一个参数，会以该参数为索引，删除该索引及其往后所有的项。因此，如果只删除一项，应该再传第二个参数“1”；