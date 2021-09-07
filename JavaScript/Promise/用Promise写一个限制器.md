## `Promise`限制并发请求问题

```js
const urls = [
  'http://jsonplaceholder.typicode.com/posts/1',
  'http://jsonplaceholder.typicode.com/posts/2', 
  'http://jsonplaceholder.typicode.com/posts/3', 
  'http://jsonplaceholder.typicode.com/posts/4',
  'http://jsonplaceholder.typicode.com/posts/5', 
  'http://jsonplaceholder.typicode.com/posts/6', 
  'http://jsonplaceholder.typicode.com/posts/7', 
  'http://jsonplaceholder.typicode.com/posts/8',
  'http://jsonplaceholder.typicode.com/posts/9', 
  'http://jsonplaceholder.typicode.com/posts/10'
]
function loadDate(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
  });
}
```

> 在 `urls` 数组中存放了 10 个接口地址。同时还定义了一个 `loadDate` 函数，这个函数接受一个 `url` 参数，返回一个 `Promise` 对象，该 `Promise` 在接口调用成功时返回 `resolve`，失败时返回 `reject`
>
> 需求 
>
> 1. 任何时候同时下载的链接数量不可以超过3个;
> 2. 要尽可能快地将所有接口中的数据得到;

```
解题思路:
1. 首先并发请求3个url中的数据
2. 当其中一条url请求得到数据后,立即请求一条新的url中的数据
3. 始终保持并发数在3个,直到所有需要加载的url全部完成请求并得到数据
```

解法1:`Promise`

```js
  const urls = [
    {img: 'image1', time: 1000},
    {img: 'image2', time: 300},
    {img: 'image3', time: 400},
    {img: 'image4', time: 800},
    {img: 'image5', time: 500},
    {img: 'image6', time: 1000},
    {img: 'image7', time: 600},
    {img: 'image8', time: 400},
  ];
  const loadImg = (url) => new Promise((resolve, reject) => {
    console.log(url.img + 'start');
    setTimeout(() => {
      console.log(url.img + 'end');
      resolve();
    }, url.time);
  });

  function limitLoad(urls, handler, limit) {
    // 拷贝一个数组(注意这里是浅拷贝)
    const sequence = [...urls];
    let promises = [];
    // 实现并发请求达到最大值limit
    promises = sequence.splice(0, limit).map((url, index) => {
      // 这里返回的index是任务在promises的索引,用于在Promise.race后找到完成的任务索引
      return handler(url).then(() => index);
    });
    // 返回最快请求成功的promise
    let p = Promise.race(promises);
    for (let i=0; i<sequence.length; i++) {
      p = p.then(res => {
        // 用新的Promise替换最快改变状态的Promise
        promises[res] = handler(sequence[i]).then(() => res);
        return Promise.race(promises);
      });
    }
  }

  limitLoad(urls, loadImg, 3);
```

 