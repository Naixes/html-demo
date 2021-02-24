# 手写Promise

该实现完全参考Promise/A+规范：https://promisesaplus.com/
中文参考：https://www.ituring.com.cn/article/66566

## Promise 自身的状态

1. state：存放当前的状态
2. value：存放当前状态的值
3. then 方法：返回一个Promise
4. catch 方法
5. finally 方法
6. 静态方法，Promise.all/resolve等

## 实现步骤

1. 实现一个可以异步resolve并且在then中获取结果的Promise
2. 加入state
3. 加入value
4. 实现一个可以同步resolve并且在then中获取结果的Promise
5. 实现一个可以防止resolve多次的Promise
6. 实现一个可以链式调用then的Promise（then返回Promise）
7. 实现一个支持空的then的Promise（支持透传）
<!-- 以下步骤较复杂，完成上面的步骤算是一个简单的Promise实现了 -->
8. 实现一个支持then传递thenable对象的Promise（给then中注入resolve和reject使其操作与Promise保持一致）
9. 实现一个支持then传递Promise的Promise
10. 实现一个支持resolve传递Promise的Promise
11. 实现一个可以处理then中循环Promise的Promise（处理循环引用，抛出循环引用错误）
12. 实现一个支持静态方法Promise.all的Promise
13. 实现一个支持reject和catch的Promise
14. 实现一个支持处理完成态和失败态的Promise

> 规范参考：
>
> ...
> then 方法必须返回一个 promise 对象 注3
> promise2 = promise1.then(onFulfilled, onRejected);   
> 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise > 解决过程：[[Resolve]](promise2, x)
>
> ...
>
> **Promise 解决过程**
>
> **Promise 解决过程**是一个抽象的操作，其需输入一个 `promise` 和一个值，我们表示为 `[[Resolve]](promise, x)`，如果 `x` 有 `then` 方法且看上去像一个 Promise ，解决程序即尝试使 `promise` 接受 `x` 的状态；否则其用 `x` 的值来执行 `promise` 。
>
> 这种 *thenable* 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 `then` 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。
>
> 运行 `[[Resolve]](promise, x)` 需遵循以下步骤：
>
> **`x` 与 `promise` 相等**
>
> 如果 `promise` 和 `x` 指向同一对象，以 `TypeError` 为据因拒绝执行 `promise`
>
> **`x` 为 Promise**
>
> 如果 `x` 为 Promise ，则使 `promise` 接受 `x` 的状态 注4：
>
> - 如果 `x` 处于等待态， `promise` 需保持为等待态直至 `x` 被执行或拒绝
> - 如果 `x` 处于执行态，用相同的值执行 `promise`
> - 如果 `x` 处于拒绝态，用相同的据因拒绝 `promise`
>
> **`x` 为对象或函数**
>
> 如果 `x` 为对象或者函数：
>
> - 把 `x.then` 赋值给 `then` 注5
>
> - 如果取 `x.then` 的值时抛出错误 `e` ，则以 `e` 为据因拒绝 `promise`
>
> - 如果`then`是函数，将`x`作为函数的作用域`this`调用之。传递两个回调函数作为参数，第一个参数叫做`resolvePromise`，第二个参数叫做`rejectPromise`:
>   - 如果 `resolvePromise` 以值 `y` 为参数被调用，则运行 `[[Resolve]](promise, y)`
>
>   - 如果 `rejectPromise` 以据因 `r` 为参数被调用，则以据因 `r` 拒绝 `promise`
>
>   - 如果 `resolvePromise` 和 `rejectPromise` 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
>
>   - 如果调用`then`方法抛出了异常`e`：
>
>     - 如果 `resolvePromise` 或 `rejectPromise` 已经被调用，则忽略之
>     - 否则以 `e` 为据因拒绝 `promise`
>
>   - 如果 `then` 不是函数，以 `x` 为参数执行 `promise`
>
> - 如果 `x` 不为对象或者函数，以 `x` 为参数执行 `promise`
>
> 如果一个 promise 被一个循环的 *thenable* 链中的对象解决，而 `[[Resolve]](promise, thenable)` 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 `TypeError` 为据因来拒绝 `promise` 注6。
