const Koa = require('Koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

let router = new Router()
// router.get('/a', (ctx, next) => {
// 	ctx.req
// 	ctx.res
// })
router.get('/a', async ctx => {
	ctx.body = 'aa'
	ctx.body += 'bb'
})

// 嵌套路由
let userRouter = new Router()
userRouter.get('/', async ctx =>{ctx.body = 'user'})
let admin = new Router()
// /user/admin/a
admin.get('/a', async ctx =>{ctx.body = 'admin-a'})
let comp = new Router()
comp.get('/a', async ctx =>{ctx.body = 'comp-a'})

userRouter.use('/admin', admin.routes())
userRouter.use('/comp', comp.routes())

let newsRouter = new Router()

router.use('/user', userRouter.routes())
router.use('/news', newsRouter.routes())

server.use(router.routes())

// todo:分文件
