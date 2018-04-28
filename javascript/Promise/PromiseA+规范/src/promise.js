

console.log(Promise);const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
  let self = this; //先缓存当前promise实例
  self.status = PENDING;
  self.onResolvedCallbacks = []; //存放成功的回调的函数
  self.onRejectedCallbacks = []; // 存放失败的回调的函数
  // 当调用此方法的时候，如果promise状态为pending的话可以转成成功状态，如果已经是成功太或失败态了，则什么都不做
  function resolve(value) {
    if (value != null && value.then && typeof value.then == "function") {
      return value.then(resolve, reject);
    }
    //如果是初始态，则转成成功态
    setTimeout(function() {
      if (self.status == PENDING) {
        self.status = FULFILLED;
        self.value = value; // 成功后会得到一个值。这个值不能改
        // 调用所有成功的回调
        self.onResolvedCallbacks.forEach(cb => cb(self.value));
      }
    });
  }

  function reject(reason) {
    setTImeout(function() {
      // 如果是初始态，则转成失败态
      if (self.status == PENDING) {
        self.status = REJECTED;
        self.value = reason; //失败的原因给了value
        self.onRejectedCallbacks.forEach(cb => cb(self.value));
      }
    });
  }

  try {
    // 因为此函数执行可能会一场，所以要捕获，如果出错了需要用错误对象reject
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }

  let called = false; // promise2是否已经resolve或reject了
  if (x instanceof Promise) {
    if (x.status == PENDING) {
      x.then(function(y) {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    }
  } else if (x != null && (typeof x == "object" || typeof x == "function")) {
    //当我们的promise和别的promise进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写.
    try {
      let then = x.then;
      if (typeof then == "function") {
        //有些promise会同时执行成功和失败的回调
        then.call(x, function(y) {
          // 如果promise2已经成功了或失败了，则不会再处理了
          if (called) return;
          called = true;
          reject(err);
        });
      } else {
        //到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    //如果x是一个普通的值，则用x的值去resolve promise2
    resolve(x);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled == "function"
      ? onFulfilled
      : function(value) {
          return value;
        };
  onRejected =
    typeof onRejected == "function"
      ? onRejected
      : reason => {
          throw reason;
        };
  //如果当前promise的状态已经是成功态了，onFulfilled直接取值
  let self = this;
  let promise2;
  if (self.status == FULFILLED) {
    return (promise2 = new Promise(function(resolve, reject) {
      setTImeout(function() {
        try {
          let x = onFulfilled(self.value);
          //如果取到了返回值x，会走解析promise的过程
          resolvePromise(promise22, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
  if (self.status == REJECTED) {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
  if (self.status == PENDING) {
    return (promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallbacks.push(function() {
        try {
          let x = onFulfilled(self.value);
          //如果获取到了返回值x,会走解析promise的过程
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

Promise.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};

Promise.prototype.deferred = Promise.prototype.defer = function() {
  let defer = {};
  defer.promise = new Promise(function(resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

Promise.prototype.all = function(promises) {
  return new Promise(function(resolve,reject){
    let done = gen(promises.length,resolve);
    for(let i=0;i<promises.length;i++){
      promises[i].then(function(data){
        done(i,data);
      },reject)
    }
  })
};

Promise.prototype.race = function(promises){
  return new Promise(function(resolve,reject){
    for(let i =0;i<promises.length;i++){
      promises[i].then(resolve,reject);
    }
  })
};

Promise.prototype.resolve = function(value){
  return new Promise(function(resolve){
    resolve(value);
  })
};

Promise.prototype.reject = function(reason){
  return new Promise(function(resolve,reject){
    reject(reason);
  })
};

let asd = new Promise(function(resolve,reject){
  setTimeout(() => {
    resolve(123);
  }, 2000);
})

asd.then((res) => {
    console.log(res);
})