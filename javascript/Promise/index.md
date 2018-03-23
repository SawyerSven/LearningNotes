
> 本文为个人学习笔记，并不是全部的归纳与总结，只摘录了部分内容。需要详细了解的可以参考[阮一峰ES6入门教程](http://es6.ruanyifeng.com/#docs/promise)以及[MDN关于promise的介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

### Promise 概念

Promise 是一个容器，里面保存着某个未来才会结束的事件(通常是一个一步操作)的结果。从语法上说，Promise 是某个函数返回的对象。你可以把回调函数绑定在这个对象上。

### Promise 特点

#### - 对象的状态不受外界影响。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

#### - 状态一旦改变，就不会在变，任何时候都可以得到这个结果。

#### - 在 Javascript 事件队列的当前运行完成之前，回调函数永远不会被调用。

#### - 通过.then 形式添加的回调函数，甚至异步操作完成之后才被添加的函数，都会被调用。

#### - 通过多次调用.then,可以添加多个回调函数,它们会按照插入顺序并且独立运行

### Promise 缺点

#### - 无法取消! Promise 一旦新建就会立即执行，无法中途取消

#### - Promise 内部抛出的错误如果没有设置回调函数，则不会反应到外部。

#### - 当处于 pending 状态时，无法确定 Promise 进行的阶段。

### 例子

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done"); //setTimeout的第三个参数的意思是在定时器结束后将这个参数传递给回调函数(resolve);
  });
}

timeout(1000).then(value => {
  console.log(value); // 'done'
});
```

#### - Promise 新建后就会立即执行。

```javascript
let promise = new Promise(function(resolve, reject) {
    console.log('Promise);
    resolve();
});

promise.then(function(){
    console.log('resolved);
})

console.log('Hi');

//Promise   Hi   resolved

```
Promise会在新建后立即执行，then方法指定的回调函数，会放在同步任务执行完成后执行，所以最后输出resolve

#### 如果调用resolve和reject时带有参数，那么他们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例。表示抛出的错误；resolve函数的参数除了正常的值还可能是另一个Promise实例，如下

```javascript

const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})

```

p1和p2都是Promise的实例，但是P2的resolve方法将P1作为参数，即一个异步操作的结果是返回另一个异步操作。


#### 调用resolve和reject不会终结Promise的参数函数的执行

```javascript

new Promise((resolve,reject)=>{
    resolve(1);
    console.log(2);
}).then(r=>{
    console.log(r)
})

// 2
// 1

```

调用resolve(1)后，后面的console.log(2)还是会执行，并且会首先被打印出来。因为resolved的promise是在本轮时间循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject后，Promise的使命就完成了，后继操作应该放到then方法里,而不应该直接写在resolve或reject后面。
所以最好在前面加上return语句。


#### Promise.race() 和 Promise.all()

- Promise.all方法用于将多个Promise实例包装成一个新的Promise实例

```javascript

const p = Promise.all([p1, p2, p3]);

```
Promise.all方法接受一个数组作为参数,p1,p2,p3都是Promise实例，如果不是,就会先调用下面僵啊刀的Promise.resolve方法，将参数转化为Promise实例，再进一步处理。(Promise.all方法的参数可以不是数组，但必须具有Iterator接口,且返回的每个成员都是Promise实例)

p的状态由p1、p2、p3决定，分成两种情况。

1. p1,p2,p3的状态都变成fulfilled,p的状态才会变成fulfilled,此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数

2. 只要p1,p2,p3之中有一个被rejected,p的状态就变成rejected,此时第一个被reject的实例的返回值，会传递给P的回调函数。

3. 如果作为参数的Promise实例，自己定义了catch方法，在它被rejected的时候，不会触发Promise.all()的catch方法。如果实例没有定义catch方法，则会触发Promise.all()的catch方法。



- Promise.race()方法同样是将多个Promise实例，包装成一个新的Promise实例。但是P的状态是根据第一个参数实例的状态改变。

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

上面代码中，如果5秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

#### Promise.resolve()

- Promise.resolve方法用于将现有对象转为Promise对象。

```javascript

const jsPromise = Promise.resolve($.ajax('/whatever.json));

```
上面代码将jQuery生成的deferred对象，转为一个新的Promise对象。

Promise.resolve等价于下面的写法：

```javascript

Promise.resolve('foo')
//等价于
new Promise(resolve=>resolve('foo))

```

- Promise.resolve方法的参数分为四种情况。

1. 参数是一个Promise实例

如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

2. 参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。

```javascript

let thenable = {
    then(){
        resolve(42);
    }
}

```

Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法

```javascript

let thenable = {
    then:(resolve,reject)=>{
        resolve(42);
    }
}

let p1 = Promise.resolve(thenable);
p1.then((value)=>{
    console.log(value); // 42
})

```
上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved,从而立即执行最后then方法指定的回调函数，输出42

3. 参数不是具有then方法的对象，或不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve()方法返回一个新的Promise对象，状态为Resolve。返回Promise实例的状态从一生成就是resolved,所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

4. 不带有任何参数

Promsie.resolve方法允许调用时不带参数，直接返回一个resolved状态的Promise对象。

**需要注意的是，立即resolve的Promise对象，是在本轮Event loop的结束时，而不是下一轮Event loop的开始时**

```javascript

setTimeout(function(){
    console.log('three');
},0)

Promise.resolve().then(function(){
    console.log('two');
})

console.log('one');

```

#### Promise.reject()

- Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected;

