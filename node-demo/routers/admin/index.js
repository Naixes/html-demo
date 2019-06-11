const Router = require('koa-router')
const path = require('path')
const common = require('../../lib/common')

let router = new Router()
router.get('/login', ctx => {
    // server中已经设置了路径
    ctx.render('admin/login', {
        errmsg: ctx.query.errmsg
    })
})

router.post('/login', ctx => {
    let {HTTP_ROOT} = ctx.config

    // 获取参数
    let {username, password} = ctx.request.fields
    // 校验参数
    let user = findUser(username)
    if(!user) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('用户名不存在')}`)
    } else if(user.password !== common.md5(password+ctx.config.ADMIN_PREFIX)) {
        ctx.redirect(`${HTTP_ROOT}/damin/login?errmsg=${encodeURIComponent('密码不正确')}`)
    }else {
        ctx.session['admin'] = username
    }

    function findUser(name) {
        let admins = JSON.parse(fs.readFile(path.resolve(__dirname, '../../admin.json')).toString())
        admins.array.forEach(e => {
            let u = null
            if(e.username === 'name') {
                u = e
            }
            return u
        });
    }
})

module.exports = router.routes()