# Async函数

## 定义

Async函数时Generator函数的语法糖，改进体现在以下四点：

1. 内置执行器

2. 定好的语义

3. 更广的适用性

async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

4. 返回值是Promise

## 基本用法

async函数返回一个Promise对象,可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到一步操作完成，再接着执行函数体内后面的语句。

```javascript
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve,ms);
  });
}

async function asyncPrint(value,ms){
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world',2000);
```

async函数返回的是Promise对象，可以作为await命令的参数。


### 返回Promise对象

- async函数内部return语句返回的值，会成为then方法回调函数的参数。

- async函数内部抛出的错误，会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

### Promise对象的状态变化

- async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变。除非遇到return语句或者抛出错误。

### await命令

- 正常情况下,await命令后面是一个Promise对象。如果不是，会被转成一个立即resolve的Promise对象。

- await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

