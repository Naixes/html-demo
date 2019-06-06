const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)
// 引入数据库
server.context.db = require('./libs/database')

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.body = '程序出错'
    }
})

let router = new Router()

router.all('*', async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.body = 'router出错'
    }
})

router.get('/a', async ctx => {
    ctx.body = div.title
})


server.use(router.routes())
