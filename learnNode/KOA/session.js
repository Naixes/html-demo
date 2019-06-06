const Koa = require('koa')
const session = require('koa-session')

let server = new Koa()
server.listen(8080)

// 滚动密钥
server.keys = [
    '1995-naixes',
    'sd34-naixes',
    '89ss-naixes'
]

server.use(session({
    maxAge: 20*60*1000,
    // 自动续期
    renew: true
}, server))

server.use(async ctx => {
    if(!ctx.session['view']) {
        ctx.session['view'] = 0
    }else {
        ctx.session['view']++
    }

    ctx.body = `欢迎你第${ctx.session['view']}次来访`
})