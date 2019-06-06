const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const session = require('koa-session')
const body = require('koa-better-body')
const fs = require('fs')
const ejs = require('koa-ejs')
const static = require('./routers/static')

let server = new Koa()
server.listen(8080)

// 数据库
server.context.db = require('./lib/database')

// 中间件
server.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}))

server.keys = fs.readFileSync('.keys').toString().split('\n')
server.use(session({
    maxAge: 20*60*1000,
    renew: true
}, server))

// 渲染
ejs(server, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})

// static
let router = new Router()

// 统一处理
router.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.throw(500, 'Internal Server Erro')
        console.log(error)
    }
})

router.use('/admin', require('./routers/admin'))
router.use('/api', require('./routers/api'))
router.use('', require('./routers/www'))

static(router)

server.use(router.routes())