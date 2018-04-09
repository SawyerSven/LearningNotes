### 什么是事件循环(Event Loop)

Javascript是单线程的，有了event loop的加持，Node.js才可以非阻塞地执行I/O操作，把这些操作尽量转移给操作系统来执行。

### Event Loop详解

当Node.js启动时，会做这几件事:

1. 初始化event loop

2. 开始执行脚本(或者进入REPL)。这些脚本有可能会调用一些异步API、设定时器或者调用process.nextTick()

3. 开始处理event loop

如何处理event loop呢？下图是一个简单的概览：

```
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

其中每个方框都是event loop中的一个阶段

每个阶段都有一个[先入先出队列]，这个队列存有要执行的回到函数(存的是函数地址)。不过每个阶段都有特有的使命。

什么时候停止执行这些回调呢？下列两种情况之一会停止：

1. 队列的操作全被执行完了。

2. 执行的回调数目达到指定的最大值。

然后,event loop进去下一个阶段，然后再下一个阶段。

### 各阶段概念

1. timers阶段：这个阶段执行setTimeout和setInterval的回调函数

2. I/O callbacks阶段：不在timers阶段、close callbacks阶段和check阶段这三个阶段执行的回调，都在此阶段负责，几乎包含了所有的回调函数。

3. idle,prepare阶段：event loop内部使用的阶段(不用关心这个阶段)

4. poll阶段：获取新的I/O事件。在某些场景下Node.js会阻塞在这个阶段。

5. check阶段：执行setImmediate()的回调函数。

6. close callbacks阶段：执行关闭事件的回调函数，如socket.on('close',fn)里的fn。

一个Node.js程序结束时，Node.js会检查event loop是否在等待异步I/O操作结束，是否在等待计时器触发，如果没有，就会关掉event loop

### 各阶段详解

#### timers阶段

计时器实际上是在指定多久以后可以执行某个回到函数，而不是指定某个函数的确切执行时间。当指定的时间到达后，计时器的回调函数会尽早被执行。 

如果操作系统很忙，或者Node.js正在执行一个耗时的函数，那么计时器的回调函数就会被推迟执行。

>注意，从原理上来说，poll阶段能控制计时器的回调什么时候执行。

举例来说，你设置了一个计时器在100毫秒后执行，然后你的脚本用95秒来异步读取了一个文件

当event loop 进入poll阶段，发现poll队列为空(因为文件还没读完)，event loop检查了一下最近的计时器，大概还有100毫秒时间，于是event loop决定这段时间就停在poll阶段。  

在poll阶段停了95毫秒之后，操作完成，一个耗时10毫秒的回调函数被系统放入poll队列，于是event loop去看了最近的计时器,于是经由check阶段，close callbacks阶段绕回到timers阶段，执行timers队列里的那个回调函数。

所以100毫秒的计时器实际上是在105毫秒以后才执行的。

> 为了防止poll阶段占用了event loop的所有时间，libuv(Node.js用来实现evnent loop和所有异步行为的C语言写成的库)对poll阶段的最长停留时间做出了限制。

#### I/O callba阶段

这个阶段会执行一些系统操作的回调函数，比如TCP报错，如果一个TCP socket开始连接时出现了ECONNREFUSED错误，一些*NIX系统就会通知这个错误。这个错误就会被放入I/O callbacks队列。

#### poll阶段(轮询阶段)

poll阶段有两个功能：

1. 如果发现计时器时间到了，就会绕回到timers阶段执行计时器的回调。

2. 然后再，执行poll队列里的回调。

当event loop 进入poll阶段，如果发现没有计时器，就会：

1. 如果poll队列不是空的，event loop就会依次执行队列里的回调函数，直到队列被清空或者到达poll阶段的时间上线

2. 如果poll队列是空的，就会：

1. 如果有setImmediate()任务，event loop就会结束poll阶段去往check阶段。

2. 如果没有setImmediate()任务，event loop 就会等待新的回调函数进入poll队列，并立即执行。

一旦 poll 队列为空，event loop 就会检查计时器有没有到期，如果有计时器到期了，event loop 就会回到 timers 阶段执行计时器的回调。

#### check阶段

这个阶段允许开发者在poll阶段结束后立即执行一些函数。如果poll阶段空闲了，同时存在setImmediate()任务，event loop就会进入check阶段。

setImmediate() 实际上是一种特殊的计时器，有自己特有的阶段。它是通过 libuv 里一个能将回调安排在 poll 阶段之后执行的 API 实现的。

一般来说，当代码执行后，event loop 最终会达到 poll 阶段，等待新的连接、新的请求等。但是如果一个回调是由 setImmediate() 发出的，同时 poll 阶段空闲下来了，event loop就会结束 poll 阶段进入 check 阶段，不再等待新的 poll 事件。

#### close  callbacks

如果一个socket或者handle被突然关闭(比如socket.destroy()),那么就会有一个close事件进入这个阶段。否则,这个close事件就会进入process.nextTick()。

#### setImmediate() / setTimeout()

setTimmediate()的作用是在当前poll阶段结束后调用一个函数。

setTimeout()的作用是在一段时间后调用一个函数。

这两者的回调的执行顺序取决于setTimeout和setImmediate被调用时的环境。

如果setTimeout和setImmediate都是在主模块中被调用的，那么回调的执行顺序取决于当前进程的性能。这个性能受其他应用程序进程的影响。

举例来说，如果在主模块中运行下面的脚本，那么两个回调的执行顺序是无法判断的：

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

```
运行结果如下：

```
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

但是，如果把上面代码放到I/O操作的回调里，setImmediate的回调总是优先于setTimeout的回调：

```js

// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});

```

运行结果如下：

```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

> setImmediate的主要优势就是，如果在I/O操作的回调里，setImmediate的回调总是比setTimeout的回调先执行。

#### process.nextTick()

从技术上来讲，process.nextTick()并不是event loop的一部分。实际上，不管event loop当前处于哪个阶段，nextTick队列都是在当前阶段后就被执行了。

回过头来看我们的阶段图，你在任何一个阶段调用 process.nextTick(回调)，回调都会在当前阶段继续运行前被调用。这种行为有的时候会造成不好的结果，因为你可以递归地调用 process.nextTick()，这样 event loop 就会一直停在当前阶段不走……无法进入 poll 阶段。

为什么Node要这样设计process.nextTick呢？

因为有些异步API需要保证一致性，即使可以同步完成，也要保证异步操作的顺序：

```js

function apiCall(arg,callback){
    if(typeof ard !== 'string')
        return process.nextTick(callback,new typeError('argument should be string'));
}


```

这段代码检查了参数的类型，如果不是string,就会将error传递给callback。

这段代码保证apiCall调用之后的同步代码能在callback之前运行，由于用到了process.nextTick()，所以callback会在event loop进入下一个阶段前执行。

为了做到这一点，js的调用栈可以先unwind再执行nextTick的回调，这样无论你递归调用多少次process.nextTick()都不会造成调用栈移除。


#### process.nextTick() vs setImmediate()

process.nextTick()的回调会在当前event loop阶段[立即]执行。

setImmediate()的回调会在后续的event loop 周期(tick)执行。

二者的名字应该互换才对。process.nextTick() 比 setImmediate() 更 immediate（立即）一些。

> 我们推荐开发者在任何情况下都使用 setImmediate()，因为它的兼容性更好，而且它更容易理解。


#### 什么时候用process.nextTick()

1. 让开发者处理错误、清除无用的资源，或者在event loop当前阶段结束前尝试重新请求资源

2. 有时候有必要让一个回调在调用栈unwind之后，event loop 进入下一个阶段之前执行。

