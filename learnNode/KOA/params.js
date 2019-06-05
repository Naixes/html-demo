// 两种传参方式
// urlencoed：顺序灵活，可省略，不利于SEO
const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

let router = new Router()
router.get('/a', ctx => {
    ctx.body = ctx.query.id
})
// 可添加多个
router.get('/a/:id', async (ctx, next) => {
    ctx.body = ctx.params.id
    await next()
})
router.get('/a/123', (ctx, next) => {
    let {id} = ctx.params
    ctx.body += id
})

server.use(router.routes())
