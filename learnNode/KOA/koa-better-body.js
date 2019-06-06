const Koa = require('koa')
const Router = require('koa-router')
// 会有警告
const body = require('koa-better-body')

let server = new Koa()
server.listen(8080)

let router = new Router()

server.use(body({
    uploadDir: './static/upload'
}))

router.post('/upload', ctx => {
    // 文件和post数据
    console.log(ctx.request.fields)
    ctx.body = 'hhh'
})

server.use(router.routes())

// server.use(async ctx=>{
//     //文件和post数据
//     console.log(ctx.request.fields);
  
//     ctx.body='aaa';
// });