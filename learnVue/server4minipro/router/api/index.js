const Router = require('koa-router')

let router = new Router()
router.get('/account_type', ctx =>{
    ctx.body = ['娱乐', '汽车', '情感', '美食', '时尚', 'js']
})

// 获取省
router.get('/province', async ctx => {
    ctx.body = await ctx.db.query('SELECT * FROM province')
})

// 获取市
router.get('/city/:proid', async ctx => {
    let {proid} = ctx.params
    ctx.body = await ctx.db.query('SELECT * FROM city WHERE proID=?', proid)
})

module.exports = router.routes()