const Koa = require('koa')
const ejs = require('koa-ejs')
const path = require('path')

let server = new Koa()
server.listen(8080)

ejs(server, {
    // 模板目录
    root: path.resolve(__dirname, 'template'),
    // true会再加一层目录
    layout: false,
    // 扩展名
    viewExt: 'ejs',
    cache: false,
    debug: false
})

server.use(async ctx => {
    await ctx.render('hello', {
        title: 'hello',
        users: [
            {name: 'a', pass: '1'},
            {name: 'b', pass: '2'},
            {name: 'c', pass: '3'},
        ]
    })
})