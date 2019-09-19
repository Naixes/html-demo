console.log('helloo')
// 引入css
require('./main.css')
const fn = () => {
    console.log('我是箭头函数')
}

class A {
    constructor(a) {
        this.a = a
        console.log(a)
    }
    // 报错：Support for the experimental syntax 'classProperties' isn't currently enabled
    // 安装包：@babel/plugin-proposal-class-properties
    b = 'class property'
}
let a = new A('class')

let p = new Promise((resolve, reject) => {
    resolve('this is promise')
})

p.then(res => {
    console.log(res)    
})

function * gen(params) {
    yield 'gen'
}
// 浏览器报错：regeneratorRuntime is not defined
// 安装包：@babel/plugin-transform-runtime @babel/runtime(上线后也需要：--save)
console.log(gen().next())

console.log('includes', [1, 2, 3].includes(2))

fn()