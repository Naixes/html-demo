const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let server = new Koa()
server.listen(8080)

let router = new Router()
server.use(router.routes())

// server.use(static('./static', {
//     // 缓存时间
//     maxage: 86400*1000,
//     // 默认访问文件
//     index: '1.html'
// }))

// 结合路由设置缓存时间
let staticRouter = new Router()
// .表示除换行符以外的单个字符需要转义，i忽略大小写
// 图片资源
staticRouter.all((/(\.jpg|\.png|\.gif)$/i), static('./static', {
    maxage: 60*86400*1000
}))
// 其余资源
staticRouter.all('*', static('./static', {
    maxage: 30*86400*1000
}))

server.use(staticRouter.routes())
