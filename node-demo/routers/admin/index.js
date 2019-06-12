const Router = require('koa-router')
const path = require('path')
const common = require('../../lib/common')
const fs = require('await-fs')

let router = new Router()

// 渲染登陆页面
router.get('/login', async ctx => {
    // server中已经设置了路径
    // 注意render是一个异步过程
    await ctx.render('admin/login', {
        HTTP_ROOT: ctx.config.HTTP_ROOT,
        errmsg: ctx.query.errmsg
    })
})

// 登录
router.post('/login', async ctx => {
    const {HTTP_ROOT} = ctx.config

    // 获取参数
    let {username, password} = ctx.request.fields

    // 获取管理员信息
    // 注意异步要被括号括起来！！！
    let admins = JSON.parse((await fs.readFile(
        path.resolve(__dirname, '../../admin.json')
        )).toString())

    function findUser(name) {
        let user = null
        admins.forEach(e => {
            if(e.username === name) {
                user = e
            }
        });
        return user
    }

    // 校验参数
    let user = findUser(username)
    if(!user) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('用户名不存在')}`)
    } else if(user.password !== common.md5(password+ctx.config.ADMIN_PREFIX)) {
        console.log(user.password)
        // console.log(common.md5(password+ctx.config.ADMIN_PREFIX))
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('密码不正确')}`)
    }else {
        // 登陆成功
        ctx.session['admin'] = username
        ctx.redirect(`${HTTP_ROOT}/admin/`)
    }

})

// 跳转至banner
router.get('/', ctx => {
    const {HTTP_ROOT} = ctx.config
    ctx.redirect(`${HTTP_ROOT}/admin/banner`)
})

router.use('/banner', require('./banner'))
router.use('/artical', require('./artical'))
router.use('/catalog', require('./catalog'))

module.exports = router.routes()