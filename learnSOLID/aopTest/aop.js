// 无侵入增加切面

// 执行两遍test
// function test() {
//     console.log(2);
//     return 0
// }

// Function.prototype.before = function (fn) {
//     const _self = this
//     // 先执行传入的函数
//     fn()
//     return _self.apply(this, arguments)
// }
// Function.prototype.after = function (fn) {
//     const _self = this
//     _self.apply(this, arguments)
//     // 后执行传入的函数
//     fn()
// }

// test.before(() => {
//     console.log(1);
// })

// test.after(() => {
//     console.log(3);
// })

// 修正，但是还没有返回0
// function test() {
//     console.log(2);
//     return 0
// }

// Function.prototype.before = function (fn) {
//     const _self = this
//     return function () {
//         // 先执行传入的函数
//         fn.apply(this, arguments)
//         _self.apply(_self, arguments)
//     }
// }
// Function.prototype.after = function (fn) {
//     const _self = this
//     return function () {
//         _self.apply(_self, arguments)
//         // 后执行传入的函数
//         fn.apply(this, arguments)
//     }
// }

// // 先挂载self = test
// // 执行before，self，after
// test.after(function() {
//     console.log(3);
// }).before(function() {
//     console.log(1);
// })()

// 一些更加细致的优化
function test() {
    console.log(2);
    return 0
}

Function.prototype.before = function (fn) {
    const _self = this
    return function () {
        // 先执行传入的函数
        // 返回false中断执行
        if(fn.apply(this, arguments) === false) {
            return false
        }
        return _self.apply(_self, arguments)
    }
}
Function.prototype.after = function (fn) {
    const _self = this
    return function () {
        // 获取原本的返回值
        const result = _self.apply(_self, arguments)
        if(result === false) {
            return false
        }
        // 后执行传入的函数
        fn.apply(this, arguments)
        return result
    }
}

// 先挂载self = test
// 执行before，self，after
const a = test.after(function() {
    console.log(3);
}).before(function() {
    console.log(1);
    // return false
})()
console.log(a);