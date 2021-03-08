// 跨域问题
// 3.1发送请求，配置代理
let xhr = new XMLHttpRequest()
xhr.open('GET', '/api/user', true)
xhr.onload = function() {
    console.log(xhr.response)
}
xhr.send()
// 3.2模拟数据
// 3.3在服务器打开webpack，端口一致不存在跨域

// 图片处理：file-loader，url-loader，html-withimg-loader
// 2.1.js引入图片
import src from './icon_plus.png' // file-loader在内部生成一张新的图片（打包后的目录中）返回图片名字
let img = new Image()
img.src = src
document.body.appendChild(img)
// 2.2.css中的background：也是file-loader

// 2.3.html中的图片：html-withimg-loader

// 全局变量引入
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
// import $ from 'jquery'
// console.log($)

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
