// setTimeout(() => {
//     console.log('timer1')

//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
//     }, 0)

//     process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//         console.log('nextTick')
//         process.nextTick(() => {
//             console.log('nextTick')
//             process.nextTick(() => {
//                 console.log('nextTick')
//             })
//         })
//     })
// })

// ==============================================================

setTimeout(function () {
    console.log(1); // 5 第一轮poll阶段发现定时器时间到了进入第二轮timers执行
}, 0);
setImmediate(function () {
    console.log(2); // 6 第二轮poll阶段发现有setImmediate进入第二轮check阶段执行
});
process.nextTick(() => {
    console.log(3); // 3 第一轮timer->IO
});
new Promise((resovle,reject)=>{
    console.log(4); // 1 同步
    resovle(4);
}).then(function(){
    console.log(5); // 4 第一轮IO阶段
});
console.log(6); // 2 同步

// ==============================================================