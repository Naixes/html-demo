# 手写Promise

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
