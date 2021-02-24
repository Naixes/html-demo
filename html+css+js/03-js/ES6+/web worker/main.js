// 创建一个worker进程
const worker = new Worker('./worker.js')

// // 向worker进程发送数据
// worker.postMessage('this is main')

// 使用ShareArrayBuffer共享数据
// 新建1kb内存
const shareBuffer = new SharedArrayBuffer(1024)

// 读写数据需要建立视图
const intArrayBuffer = new Int32Array(shareBuffer)
for(let i = 0; i < intArrayBuffer.length; i++) {
    intArrayBuffer[i] = i
}

// 传送的是地址
worker.postMessage(intArrayBuffer)

// 唤醒worker进程，一般主线程不应该进入休眠
setTimeout(() => {
    // 视图 位置，必须对应 唤醒的进程数，默认Infinity
    Atomics.notify(intArrayBuffer, 19, 1)
}, 3000)

// Atomics提供的运算
// Atomics.add(intArrayBuffer, index, value)
//         sub(intArrayBuffer, index, value)
//         and/or/xor //位运算
//         compareExchange(intArrayBuffer, index, oldValue, newValue) // value等于old时赋值为new

// 接受worker进程postMessage的数据
worker.onmessage = function(e) {
    console.log('接收到的数据', e.data);
    console.log('修改的的数据', Atomics.load(intArrayBuffer, 20));
}