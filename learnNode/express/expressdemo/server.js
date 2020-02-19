const express = require('express')

let server = express()
server.listen(8080)

// 实现body-parser
const querystring = require('querystring')
server.use((req, res, next) => {
    let arr = []
    req.on('data', buffer => {
        arr.push(buffer)
    })
    req.on('end', () => {
        let body = querystring.parse(Buffer.concat(arr).toString())
        req.body = body
        next()
    })
})

// 自带路由
server.get('/aa', (req, res, next) => {
    // 不能通过next传递参数
    req.user = 'aa'
    next()
})
server.get('/aa', (req, res, next) => {
    console.log(req.user)
    // send没有格式限制
    res.send('end')
})

server.post('/reg', (req, res) => {
    console.log(req.body)
})

// 静态服务
// server.use('/public/', express.static('./static/'))
server.use(express.static('./static/'))
