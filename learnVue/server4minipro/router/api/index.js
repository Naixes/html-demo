const Router = require('koa-router')
const guid = require('uuid')

const re = require('../../lib/re')
const config = require('../../config')

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

// 注册
router.post('/reg', async ctx => {
    console.log(ctx.request.fields)
    let post = ctx.request.fields
    // 校验参数
    if(!re.email.test(post['email'])) {
        ctx.body = {
            err: 1,
            msg: 'email incrrect'
        }
    }else {
        try {
            // 注意query的参数是数组
            await ctx.db.query("INSERT INTO user_table (email, password, type, display_name, slogan, catalog, icon, description, other_channels, name, identify_number, province, city, qq_wx, recommend_code, token, token_expires) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [post['email'], post['password'], post['type'], post['display_name'], post['slogan'], post['catalog'], post['icon'], post['description'], post['other_channels'], post['name'], post['identify_number'], post['province'], post['city'], post['qq_wx'], post['recommend_code'], '', 0])
            ctx.body = {
                err: 0
            }
        } catch (error) {
            ctx.body = {
                err: 1,
                msg: 'database error'
            }
            console.log(error)
        }
    }
})

// 登录
router.post('/login', async ctx => {
    console.log(ctx.request.fields)
    let {email, password} = ctx.request.fields
    let rows = await ctx.db.query("SELECT * FROM user_table WHERE email=?", [email])
    if(!rows.length) {
        ctx.body = {
            err: 1,
            msg: 'no this email'
        }
    }else {
        if(rows[0].password !== password) {
            ctx.body = {
                err: 1,
                msg: 'password incrrect'
            }
        }else {
            let token = guid().replace(/\-/g, '')
            let token_expires = Math.floor((Date.now() + config.TOKEN_AGE) / 1000)

            await ctx.db.query("UPDATE user_table SET token=?, token_expires=?", [token, token_expires])
            ctx.body = {
                err: 0,
                token
            }
        }
    }
})

module.exports = router.routes()