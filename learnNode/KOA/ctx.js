const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

// server.context相当于ctx的原型
// 可以放一些全局参数
server.context.a = 12

let router = new Router()
router.get('/a', async (ctx, next) => {
    let {user, pass} = ctx.query
    if(user && pass) {
        ctx.body = user + pass
    }else {
        // ctx.throw(code, msg)
        ctx.throw(400, 'user and pass are required')
    }
    // ctx.assert(condition, code, msg) // 和 throw 类似
    // ctx.assert(user, 400, 'user is required')
    // ctx.assert(pass, 400, 'pass is required')
    

    // ctx.request
    // ctx.response
    // ctx.method
    // ctx.url
    // ctx.path
    // ctx.query
    // 客户端ip
    // ctx.ip                 
    // ctx.headers
    console.log('ctx.url', ctx.url)
    console.log('ctx.method', ctx.method)
    console.log('ctx.path', ctx.path)
    console.log('ctx.ip', ctx.ip)
    console.log('ctx.headers', ctx.headers)
    console.log('ctx.request', ctx.method)
    console.log('ctx.response', ctx.method)
})

server.use(router.routes())

// 设置状态码
// ctx.state = 305
// 重定向
// ctx.redirect()
// 下载文件
// ctx.attachment()       