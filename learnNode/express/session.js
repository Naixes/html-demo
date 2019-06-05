const express = require('express')
const cookieSession = require('cookie-session')

let server = express()
server.listen(8080)

// 强制签名
server.use(cookieSession({
    // 循环秘钥，每个用户的每次登录都不同 
    keys: ['naixes1995', 'sartine1995'],
    maxAge: 20*60*1000 // 20分钟
}))

server.get('/a', (req, res) => {
    if(!req.session['view']) {
        req.session['view'] = 1
    }else {
        req.session['view']++
    }
    req.session['amount'] = 99
    res.send(`欢迎你第${req.session['view']}次访问本站，你的余额为${req.session['amount']}`)
})

