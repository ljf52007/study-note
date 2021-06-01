class Promise {
  constructor(executor){
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    //成功的
    this.onResolvedCallbacks = []
    //失败的
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      console.log('haha')
      if(this.state === 'pending'){
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    const reject = (reason) => {
      console.log ('xixi')
      if(this.state === 'pending'){
        this.state = 'rejected '
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
    executor(resolve,reject)
  }
  then(onFulfilled, onRejected){
    console.log(this.state)
    const returnPromise = new Promise((resolve,reject)=>{
      if(this.state == 'fulfilled'){
        setTimeout(()=>{
          const x = onFulfilled(this.value) //promise || string...所以要判断
          resolvePromise(returnPromise,x,resolve,reject)//这里returnPromise并没有诞生，
        },0)                                          //所以要用setTimeOut进入下一个事件循环
      }                                          
      if(this.state == 'rejected'){
        setTimeout(()=>{
          const x = onRejected(this.reason)
          resolvePromise(returnPromise,x,resolve,reject)
        },0)
      }
      if(this.state == 'pending'){
        this.onResolvedCallbacks.push(()=>{
          setTimeout(()=>{
            const x = onFulfilled(this.value)
            resolvePromise(returnPromise,x,resolve,reject)
          },0)
        })
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            const x = onRejected(this.reason)
            resolvePromise(returnPromise,x,resolve,reject)
          },0)
        })
      }
    })
    return returnPromise
  }
};
const resolvePromise = (returnPromise,x,resolve,reject)=>{
  // console.log(returnPromise,x,resolve,reject)
  if(returnPromise === x){
    return reject(new TypeError('循环引用！'));
  }
  if(typeof x === 'function' || (typeof x === 'object'&& x!==null)){
    try {
      const then = x.then
      if(typeof then === 'function'){ //我们就认为它是一个promise
        then.call(x,y=>{
          // resolve(y)
          // 递归解析
          resolvePromise(returnPromise, x, resolve, reject);
        },r=>{
          reject(r)
        })
      }
    } catch (error) {
      reject(error)
    }
  }else{
    //返回不是一个promise，直接返回
    resolve(x)
  }
}

module.exports =  Promise