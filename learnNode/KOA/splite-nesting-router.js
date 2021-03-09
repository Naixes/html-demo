const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

let router = new Router()

// 路径前缀设置
router.prefix = '/api'

router.get('/a', ctx => {
    ctx.body = 'aa'
    ctx.body += 'bb'
})
router.use('/user', require('./routers/user'))

server.use(router.routes())
    // 拦截器，拦截未匹配到的请求返回4xx或者5xx的错误
    .use(router.allowedMethods())