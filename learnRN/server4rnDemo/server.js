const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8080)

let router = new Router()

// 列表数据
lastID = 5
let accounts=[
    {ID: 1, title: '通讯', amount: 100, income: 0},
    {ID: 2, title: '购物', amount: 58, income: 0},
    {ID: 3, title: '工资', amount: 8000, income: 1},
    {ID: 4, title: '吃饭', amount: 87, income: 0},
  ];

router.get('/msg/:msg', async(ctx, next) => {
    console.log(ctx.params.msg)
})

router.get('/list', async(ctx, next) => {
    ctx.body = accounts
    console.log('请求列表')
})

router.get('/add/:title/:amount/:income', async(ctx, next) => {
    let {title, amount, income} = ctx.params

    accounts.push({
        ID: lastID++,
        title,
        amount,
        income
    })
    console.log(accounts)

    ctx.body = {ok: true}
})
server.use(router.routes())
