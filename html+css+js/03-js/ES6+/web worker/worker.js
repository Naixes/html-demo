onmessage = function(e) {
    // 接受主线程数据
    const arrBuffer = e.data
    console.log('arrBuffer', Atomics.load(arrBuffer, 20));

    // 这样操作是不安全的，要使用Atomics进行操作
    // arrBuffer[20] = 2222
    // 返回写入的值2222
    Atomics.store(arrBuffer, 20, 2222)
    // 返回被替换的值2222
    Atomics.exchange(arrBuffer, 20, 3333)

    // 进程休眠
    // 满足arrBuffer[19]===19时进入休眠
    Atomics.wait(arrBuffer, 19, 19)
    // 满足arrBuffer[19]===19时进入休眠，两秒后唤醒，也可在主线程中进行唤醒
    // Atomics.wait(arrBuffer, 19, 19, 2000)
    console.log('arrBuffer[19]!=19，或被唤醒时执行');

    // 向主线程发送数据
    postMessage('this is worker')
}