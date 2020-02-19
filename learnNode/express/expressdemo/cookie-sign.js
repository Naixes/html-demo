const express = require('express')
const cookieParser = require('cookie-parser')

let server = express()
server.listen(8080)

server.use(cookieParser('naixes1995'))

server.get('/a', (req, res) => {

    // cookie 不跨域，子级可以访问父级，父级不能访问子级
    res.cookie('amount', 99, {
        // 通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击
        httpOnly: true,
        // domain 设为主域名，
        // domain: 'aaa.com',
        // path 可以往上访问不能向下访问，一般设为'/'根
        path: '/',
        maxAge: 14*86400*1000,
        // 签名
        signed: true
    })

    console.log('cookies', req.cookies)
    // 签名cookie
    console.log('signedCookies', req.signedCookies)

    res.send('ok')
})