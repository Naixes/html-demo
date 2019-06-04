import { createContext } from "vm";

// 两种传参方式
// urlencoed：顺序灵活，可省略，不利于SEO

// server.context相当于ctx的原型
// 可以放一些全局参数

// ctx.request
// ctx.response
// ctx.method
// ctx.url
// ctx.path
// ctx.query
// ctx.ip        客户端ip
// ctx.headers

// ctx.throw(code, msg)
// ctx.assert(condition, code, msg)
// ctx.state = 305
// ctx.redirect()
// ctx.attachment()       下载文件