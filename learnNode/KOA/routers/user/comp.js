const Router = require('koa-router')

let router = new Router()
router.get('/a', ctx => {
    ctx.body('comp-a')
})

module.exports = router.routes()