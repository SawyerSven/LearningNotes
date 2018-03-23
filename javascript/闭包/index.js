

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(new Date(), i);
//   }, 1000);
// }

// console.log(new Date(), i);

// 如果要输出结果为5->0,1,2,3,4

// IIFE
/* for (var i = 0; i < 5; i++) {
  (function (i) {
     setTimeout(() => {
      console.log(i);
     }, 1000);
  })(i)
}

console.log(new Date(), i);
 */

// API文档解决方案
// Chrome中指向Window,Node中返回了一个空对象。
// MDN文档中描述在严格模式中，setTimeout的回调返回undefined,实际操作中依旧返回Window
// for (var i = 0; i < 5; i++) {
//   setTimeout(
//     i => {
//       console.log(i);
//     },
//     1000,
//     i
//   ); // setTimeout可以传递额外参数,定时器到期后，它们会作为参数传递给回调函数
// }

// 解决方案3

/**
 * 这里利用的javascript的基本类型参数传递--按值传参改造出的
 */

// var output = function(i) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// };

// for (var i = 0; i < 5; i++) {
//   output(i);
// }

// console.log(i);

/* 

> ECMAScript中所有函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数内部的参数，
就和把值从一个变量复制到另一个变量一样。基本类型值的传递如同基本类型变量的复制一样。引用类型值的传递，
则如同引用类型变量的复制一样。

向参数传递基本类型的值时，被传递的值会被复制给一个局部变量(即命名参数,或者用ECMAScript的概念来说
就是arguments对象中的一个元素)。向参数传递引用类型的值，会把这个值在内存中的地址复制给一个局部变量
因此这个局部变量的变化会反映在函数外部。

var arr = [1, 2, 3, 4, 5];

function output(list) {
  list.push(6,7,8,9,0)
  console.log(list);
}

output(arr)

console.log(arr); */

// ES6解法
//  利用ES6的块级作用域中的let代替var,但是外部无法访问i，所以会报错

/* for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
console.log(i);
 */

// 新要求: 代码执行时,立即输出0,之后每隔一秒输出1,2,3,4.循环结束后大概在第五秒的时候输出5
/* 
粗暴方案
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  })(i);
}

setTimeout(() => {
  console.log(i);
}, 1000 * i);
 */

// promise方案

/* const tasks = [];

for (var i = 0; i < 5; i++) {
  (j => {
     tasks.push(new Promise((resolve) => {
        setTimeout(() => {
          console.log(j);
          resolve();
        }, 1000 * j);
     }))
  })(i);
}
Promise.all(tasks).then(() => {
  setTimeout(() => {
      console.log(i);
  }, 1000);
})
 */

// promise优化方案

/* const tasks = []; //存放异步代码

const output = i =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log(i);
      resolve();
    }, 1000 * i);
  });

// 生成所有的异步操作

for (var i = 0; i < 5; i++) {
  tasks.push(output(i));
}

Promise.all(tasks).then(() => {
  setTimeout(() => {
      console.log(i);
  }, 1000);
}) */

// async/await 方案

/* const sleep = (timeoutMS) => new Promise((resolve) => {
  setTimeout(resolve,timeoutMS);
});

(async () => {
  for(var i = 0;i<5;i++){
    if(i>0){
      await sleep(1000)
    }
    console.log(i);
  }

  await sleep(1000);
  console.log(i);
})()

 */

