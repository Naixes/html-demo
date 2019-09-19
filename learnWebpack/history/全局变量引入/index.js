// 1.直接引入jquery
// import $ from 'jquery'
// console.log($)
// // undefined
// console.log(window.$)

// 2.引入jquery
// 安装expose-loader
// 将jquery注入到全局
// 也可以在config中配置：见config
// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'
// console.log($)
// console.log(window.$)

// 3.不引入不通过window直接使用$：给每个模块注入$
// 见config
// console.log($)

// 4.通过cdn直接引入的jquery，可以直接使用$或window.$
// 为了防止重复引入要配置config，见config
// 这里引入的jquery会被忽略，浏览器会报错
import $ from 'jquery'
console.log($)

// js
const fn = () => {
    console.log('我是箭头函数')
}

fn()

class A {
    constructor(a){
        this.a = a
        console.log(a)
    }
    // 报错：Support for the experimental syntax 'classProperties' isn't currently enabled
    // 安装包：@babel/plugin-proposal-class-properties
    // b = 'class property'
}
const a = new A('class')

const p = new Promise((resolve, reject) => {
    resolve('this is promise')
})

p.then(res => {
    console.log(res)
})

function* gen(params){
    yield 'gen'
}

// 浏览器报错：regeneratorRuntime is not defined
// 安装包：@babel/plugin-transform-runtime @babel/runtime(上线后也需要：--save)
console.log(gen().next())

console.log('includes', [ 1, 2, 3 ].includes(2))

// 引入css
require('./main.css')
