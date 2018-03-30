> 学习笔记： [狼叔：如何正确的学习Node.js](https://github.com/i5ting/How-to-learn-node-correctly)

# Node简介

## 什么是Node？

- Node.js不是javascript应用，不是语言，不是Rails、Laravel或Django一样的框架，也不是像Nginx一样的Web服务器。Node.js是javascript运行时环境。

- 建构在Chrome's V9的Javascript引擎智商。

- 事件驱动(Event-driven),非阻塞I/O模型,简单来说就是每个函数都是异步的，最后由Libuv这个C/C++编写的事件循环处理库来处理这些I/O操作，隐藏了非阻塞I/O的具体细节，简化并发变成模型，让你可以轻松的编写高性能的Web应用，所以它是轻量（lightweight）且高效（efficient）的

## 基本原理

### 核心概念

- chrome v8是Google发布的开源Javascript引擎，采用C/C++编写，在Google的Chrome浏览器中被使用。Chrome V8引擎可以独立运行，也可以用来嵌入到C/C++应用程序中执行。

- Event Loop 时间循环

- Thread Pool 线程池

### 梳理一下

- Chrome V8是Javascript引擎

- Node.js内置Chrome V8引擎，所以使用它的Javascript语法

- javascript语言的一大特点就是单线程，也就是，同一时间只能做一件事

- 单线意味着所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

- 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 I/O 很慢，不得不等着结果出来，再往下执行

- CPU完全可以不管I/O设备，挂起处于等待中的任务，先运行排在后面的任务。

- 将等待中的I/O任务放到Event Loop里

- 由Event Loop将I/O任务放到线程池里

- 只要有资源，就尽力执行。

