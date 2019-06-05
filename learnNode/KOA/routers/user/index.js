const Router = require('koa-router')

let router = new Router()
router.get('/', ctx => {
    ctx.body = 'user'
})
router.use('/admin', require('./admin'))
router.use('/comp', require('./comp'))

module.exports = router.routes()