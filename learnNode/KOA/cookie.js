const Koa = require('koa')

let server = new Koa()
server.listen(8080)

// 滚动密钥
server.keys = [
    '1995-naixes',
    'sd34-naixes',
    '89ss-naixes'
]

server.use(async ctx => {
    ctx.cookies.set('user', 'naixes', {
        signed: true,
        maxAge: 86400*1000
    })
    console.log(ctx.cookies.get('user', {signed: true}))
    ctx.body = 'hhh'
})