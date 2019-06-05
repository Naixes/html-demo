const Router = require('koa-router')

let router = new Router()
router.get('/', ctx => {
    ctx.body = 'admin'
})
router.get('/a', ctx => {
    ctx.body = 'admin-a'
})

module.exports = router.routes()