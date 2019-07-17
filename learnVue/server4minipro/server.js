const koa = require('koa')
const Router = require('koa-router')
const mysql = require('mysql')
const co = require('co-mysql')

let server = new koa()
server.listen(8081)

// 连接数据库
let connect = mysql.createPool({host: 'localhost', user: 'admin', password: 'root', database: 'db4vueminipro'})
server.context.db = co(connect)

// 跨域
server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

// 路由
let router = new Router()
// 嵌套路由
router.use('/api', require('./router/api'))

server.use(router.routes())