const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

let router = new Router()

router.get('/a', ctx => {
    ctx.body = 'aa'
    ctx.body += 'bb'
})
router.use('/user', require('./routers/user'))

server.use(router.routes())