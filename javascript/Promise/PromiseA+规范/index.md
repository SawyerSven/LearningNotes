# Promise/A+规范

Promise表示一个异步操作的最终结果。与Promise最主要的交互方法是通过将函数传入它的then方法从而获取得Promise最终的值或Promsie最终拒绝的原因。

## 1. 术语

**promise**是一个包含了兼容promise规范then方法的对象或函数。

**thenable**是一个包含了then方法的对象或函数。

**value**是任何Javascript值。(包括undefined,thenable,promise等)

**exception**是由throw表达式抛出来的值。

**reason**是一个用于描述Promise被拒绝的原因的值。

## 2. 要求

### 2.1 Promise状态

一个Promise必须处在其中之一的状态：pending,fulfilled或rejected。

- 如果是pending状态，则promise：
    - 可以转换到fulfilled或rejected状态。
- 如果是fulfilled状态，则promise：
    - 不能转换成任何其他状态。
    - 必须有一个值，且这个值不能改变。
- 如果是rejected状态，则promise：
    - 不能转换成任何其他状态。
    - 必须有一个原因，且这个值不能被改变。

**值不能被改变**指的是identity不能被改变，而不是指其成员内容不能被改变。

### 2.2 方法

一个Promise必须提供一个then方法来获取其值或原因。

Promise的then方法接受两个参数：

> promise.then(onFulfilled,onRejected)

1. onFulfilled和onRejected都是可选参数：

    1. 如果onFulfilled不是一个函数，则忽略之。
    2. 如果onRejected不是一个函数，则忽略之。

2. 如果onFulfilled是一个函数：

    1. 它必须在promise fulfilled后调用，且promise的value为其第一个参数。
    2. 它不能在promise fulfilled前调用。
    3. 不能被多次调用。

3. 如果onReject是一个函数：

    1. 它必须在promise rejected后调用，且promise的reason为其第一个参数。
    2. 它不能在promise rejected前调用。
    3. 不能被多次调用。

4. onFulfilled和onRejected只允许在execution context(栈仅包含平台代码时运行).
5. onFulfilled和onRejected必须被当做函数调用(i.e. 即函数体内的this为undefined);
6. 对于一个promise,它的then方法可以调用多次

    1. 当promise fulfilled后，所有onFulfilled都必须按照其注册顺序执行。
    2. 当promise rejected后，所有onRejec都必须按照其注册顺序执行。

7. then必须返回一个promise：

> promise2 = promise1.then(onFulfilled,onRejected);

1. 如果onFulfilled或onRejected返回了值x,则执行Promise解析流程[[Resolve]](promise2,x)

2. 如果onFulfilled或onRejected抛出了异常e,则promise2应当以e为reason被拒绝。

3. 如果onFulfilled不是一个函数且promise1已经fulfilled，则Promise必须以promise1的值fulfilled。

4. 如果onReject不是一个函数且promise已经rejected，则promise2必须以相同的reason被拒绝。


### 2.3 Promise解析过程

Promise解析过程是以一个promise和一个值作为参数的抽象过程，可表示为[[Resolve]](promise,x).过程如下：

1. 如果promise和x指向相同的值，使用TypeError作为原因将promise拒绝。

2. 如果x是一个promise，采用其状态:

    1. 如果x是pending状态，promise必须保持pending走到x fulfilled或rejected。

    2. 如果x是fulfilled状态，将x的值用于fulfill promise。

    3. 如果x是rejected状态，将x的原因用于reject promise。

3. 如果x是一个对象或函数：

    1. 将then赋为x,then。

    2. 如果在取x.then值时抛出了异常，则以这个异常作为原因将promise拒绝。

    3. 如果then是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise,且：

        1. 当resolvePromise被以y为参数调用，执行[[Resolve]](promise,y).

        2. 当rejectPromise被以r为参数调用，则以r为原因将promise拒绝。

        3. 如果resolvePromise和rejectPromise都被调用了，或者被调用了多次，则只第一次有效，后面的忽略。

        4. 如果在调用then时抛出了一场，则：

            1. 如果resolvePromise或rejectPromise已经被调用了，则忽略它。

            2. 否则，以e为reason将promise拒绝。

4. 如果then不是一个函数，则以x为值fulfill promise。